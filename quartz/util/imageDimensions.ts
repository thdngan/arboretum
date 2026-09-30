import fs from "fs"
import path from "path"
import sharp from "sharp"
import { FilePath, slugifyFilePath } from "./path"
import { toPosixPath } from "./glob"
import { BuildCtx } from "./ctx"

export type Dimensions = { width: number; height: number }

const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg", ".webp"])

let indexedBuild: string | undefined

const dimensionCache = new Map<FilePath, Promise<Dimensions | undefined>>()
let slugToPath: Map<string, FilePath> | undefined
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

  if (!slug.includes("/")) return names.get(slug) ?? undefined

  const suffixMatches = [...slugs].filter(([candidate]) => candidate.endsWith(`/${slug}`))
  return suffixMatches.length === 1 ? suffixMatches[0][1] : undefined
}

export function imageDimensions(ctx: BuildCtx, url: string): Promise<Dimensions | undefined> {
  const fp = resolveImage(ctx, url)
  if (!fp) return Promise.resolve(undefined)

  let dimensions = dimensionCache.get(fp)
  if (!dimensions) {
    dimensions = sharp(fp)
      .metadata()
      .then(({ width, height, orientation }) => {
        if (!width || !height) return undefined
        return (orientation ?? 0) >= 5 ? { width: height, height: width } : { width, height }
      })
      .catch(() => undefined)
    dimensionCache.set(fp, dimensions)
  }

  return dimensions
}
