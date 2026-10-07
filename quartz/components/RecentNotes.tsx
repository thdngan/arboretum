import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/recentNotes.scss"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

export interface Options {
  title?: string
  showTitle: boolean
  marker: string | false
  datePosition: "below" | "before"
  limit: number
  linkToMore: SimpleSlug | false
  showTags: boolean
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  showTitle: true,
  marker: false,
  datePosition: "below",
  limit: 3,
  linkToMore: false,
  showTags: false,
  filter: () => true,
  sort: byDateAndAlphabetical(cfg),
})

export function recentPages(
  cfg: GlobalConfiguration,
  allFiles: QuartzPluginData[],
  userOpts?: Partial<Options>,
) {
  const opts = { ...defaultOptions(cfg), ...userOpts }
  const pages = allFiles.filter(opts.filter).sort(opts.sort)
  return {
    shown: pages.slice(0, opts.limit),
    remaining: Math.max(0, pages.length - opts.limit),
  }
}

export default ((userOpts?: Partial<Options>) => {
  const RecentNotes: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    if (fileData.slug !== "index") {
      return <></>
    }
    const { shown, remaining } = recentPages(cfg, allFiles, userOpts)
    const dateBefore = opts.datePosition === "before"
    const listClasses = ["recent-ul"]
    if (opts.marker) listClasses.push("with-marker")
    if (dateBefore) listClasses.push("date-before")
    return (
      <div class={classNames(displayClass, "recent-notes")}>
        {opts.showTitle && <h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h3>}
        <ul class={listClasses.join(" ")}>
          {shown.map((page) => {
            const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
            const tags = page.frontmatter?.tags ?? []
            const icon = page.frontmatter?.icon as string | undefined 
            const date = (page.dates || dateBefore) && (
              <p class="meta">
                {page.dates && <Date date={getDate(cfg, page)!} locale={cfg.locale} />}
              </p>
            )

            return (
              <li class="recent-li">
                {opts.marker && (
                  <span class="recent-marker" aria-hidden="true">
                    {opts.marker}
                  </span>
                )}
                <div class="section">
                  {dateBefore && date}
                  <div class="desc">
                    <h3>
                      <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                        {icon && (
                          <span class="shimmer-symbol" style={{ marginRight: "8px" }}>
                            <i class={icon}></i>
                          </span>
                        )}
                        {title}
                      </a>
                    </h3>
                  </div>
                  {!dateBefore && date}
                  {opts.showTags && (
                    <ul class="tags">
                      {tags.map((tag) => (
                        <li>
                          <a
                            class="internal tag-link"
                            href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                          >
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
        {opts.linkToMore && remaining > 0 && (
          <p>
            <a class="see-more" href={resolveRelative(fileData.slug!, opts.linkToMore)}>
              {(() => {
                const label = i18n(cfg.locale).components.recentNotes.seeRemainingMore({
                  remaining,
                })
                const at = label.lastIndexOf("\u2192")
                if (at < 0) return <span class="see-more-label">{label}</span>
                return (
                  <>
                    <span class="see-more-label">{label.slice(0, at).trimEnd()}</span>
                    <span class="see-more-arrow"> {label.slice(at)}</span>
                  </>
                )
              })()}
            </a>
          </p>
        )}
      </div>
    )
  }

  RecentNotes.css = style
  return RecentNotes
}) satisfies QuartzComponentConstructor
