import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative, slugTag } from "../util/path"
import style from "./styles/topics.scss"
import { getDate } from "./Date"
import { classNames } from "../util/lang"

interface Options {
  title: string
  exclude: string[]
  linkToAll: SimpleSlug | false
}

const defaultOptions: Options = {
  title: "Topics",
  exclude: [],
  linkToAll: "tags/" as SimpleSlug,
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const Topics: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    if (fileData.slug !== "index") {
      return <></>
    }

    const topics = new Map<string, { count: number; latest: number }>()
    for (const file of allFiles) {
      const date = getDate(cfg, file)?.getTime() ?? 0
      for (const tag of file.frontmatter?.tags ?? []) {
        if (opts.exclude.includes(tag)) continue
        const topic = topics.get(tag) ?? { count: 0, latest: 0 }
        topics.set(tag, { count: topic.count + 1, latest: Math.max(topic.latest, date) })
      }
    }
    const tags = [...topics.entries()]
      .sort(([a, x], [b, y]) => y.latest - x.latest || y.count - x.count || a.localeCompare(b))
      .map(([tag]) => tag)

    return (
      <div class={classNames(displayClass, "topics")}>
        <h3>{opts.title}</h3>
        <ul class="tags">
          {tags.map((tag) => (
            <li>
              <a
                class="internal tag-link"
                href={resolveRelative(fileData.slug!, `tags/${slugTag(tag)}` as FullSlug)}
              >
                {tag}
              </a>
            </li>
          ))}
        </ul>
        {opts.linkToAll && (
          <p>
            <a class="see-more" href={resolveRelative(fileData.slug!, opts.linkToAll)}>
              <span class="see-more-label">See all tags</span>
              <span class="see-more-arrow"> →</span>
            </a>
          </p>
        )}
      </div>
    )
  }

  Topics.css = style
  return Topics
}) satisfies QuartzComponentConstructor
