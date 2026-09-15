import fs from "fs"
import path from "path"
import sharp from "sharp"
import { FilePath, slugifyFilePath } from "./path"
import { toPosixPath } from "./glob"
import { BuildCtx } from "./ctx"

export type Dimensions = { width: number; height: number }

const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg", ".webp"])

// Index of every image in the vault, keyed by the same slugs the wikilink
// resolver emits, so a lookup is a plain map hit rather than a stat per embed.
// It is rebuilt whenever the build id changes, which is what keeps `--serve`
// honest about images added or replaced since the last pass.
let indexedBuild: string | undefined

const dimensionCache = new Map<FilePath, Promise<Dimensions | undefined>>()
let slugToPath: Map<string, FilePath> | undefined
// Obsidian lets an embed name just the file when that name is unique in the
// vault. `null` marks a name that is not unique, which mirrors transformLink's
// rule of only taking the shortcut when there is exactly one match.
let nameToPath: Map<string, FilePath | null> | undefined

function indexImages(contentDir: string) {
  const slugs = new Map<string, FilePath>()
  const names = new Map<string, FilePath | null>()

  const walk = (dir: string) => {
    let entries: fs.Dirent[]
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }

    for (const entry of entries) {
      const fp = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (!entry.name.startsWith(".")) walk(fp)
        continue
      }

      if (!imageExtensions.has(path.extname(entry.name).toLowerCase())) continue

      const relative = toPosixPath(path.relative(contentDir, fp))
      const slug = slugifyFilePath(relative as FilePath)
      slugs.set(slug, fp as FilePath)

      const name = slug.split("/").at(-1)!
      names.set(name, names.has(name) ? null : (fp as FilePath))
    }
  }

  walk(contentDir)
  slugToPath = slugs
  nameToPath = names
}

// `url` is a slug, not a path on disk: it has been through slugifyFilePath, so
// it is matched against slugs rather than resolved against the filesystem.
function resolveImage(ctx: BuildCtx, url: string): FilePath | undefined {
  if (indexedBuild !== ctx.buildId) {
    indexImages(ctx.argv.directory)
    dimensionCache.clear()
    indexedBuild = ctx.buildId
  }
  const slugs = slugToPath!
  const names = nameToPath!

  const slug = url.replace(/^\.?\//, "")
  const exact = slugs.get(slug)
  if (exact) return exact

  // an embed that names only the file, or only the tail of its path, resolves
  // the way transformLink's "shortest" strategy does: solely when unambiguous
  if (!slug.includes("/")) return names.get(slug) ?? undefined

  const suffixMatches = [...slugs].filter(([candidate]) => candidate.endsWith(`/${slug}`))
  return suffixMatches.length === 1 ? suffixMatches[0][1] : undefined
}

// Intrinsic size of an embedded image, or undefined if it cannot be read (a
// missing file, or a format sharp does not decode, such as BMP). Callers are
// expected to carry on without dimensions rather than fail the build.
export function imageDimensions(ctx: BuildCtx, url: string): Promise<Dimensions | undefined> {
  const fp = resolveImage(ctx, url)
  if (!fp) return Promise.resolve(undefined)

  let dimensions = dimensionCache.get(fp)
  if (!dimensions) {
    dimensions = sharp(fp)
      .metadata()
      .then(({ width, height, orientation }) => {
        if (!width || !height) return undefined
        // EXIF orientations 5-8 are quarter turns. sharp reports the stored
        // pixels; a browser shows the rotated image (CSS image-orientation
        // defaults to from-image), so the attributes have to follow the turn.
        return (orientation ?? 0) >= 5 ? { width: height, height: width } : { width, height }
      })
      .catch(() => undefined)
    dimensionCache.set(fp, dimensions)
  }

  return dimensions
}
