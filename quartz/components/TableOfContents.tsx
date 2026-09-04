import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import legacyStyle from "./styles/legacyToc.scss"
import modernStyle from "./styles/toc.scss"
import drawerStyle from "./styles/tocDrawer.scss"
import { classNames } from "../util/lang"
import { TocEntry } from "../plugins/transformers/toc"

// @ts-ignore
import script from "./scripts/toc.inline"
// @ts-ignore
import drawerScript from "./scripts/tocDrawer.inline"
import { i18n } from "../i18n"

interface Options {
  layout: "modern" | "legacy"
}

const defaultOptions: Options = {
  layout: "modern",
}

// the references/bibliography heading is the one entry whose number comes from
// the content rather than from the list itself, so it gets stripped and flagged
// here instead of in every renderer below
function tocEntryParts(tocEntry: TocEntry) {
  const isReference = tocEntry.slug === "references" || tocEntry.slug === "bibliography"
  return {
    isReference,
    // Strip out any hardcoded numbers (e.g. "5. References" -> "References")
    displayText: isReference ? tocEntry.text.replace(/^[\d.]+\s*/, "") : tocEntry.text,
  }
}

const TableOfContents: QuartzComponent = ({
  fileData,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  if (!fileData.toc) {
    return null
  }

  return (
    <div class={classNames(displayClass, "toc")}>
      <button
        type="button"
        id="toc"
        class={fileData.collapseToc ? "collapsed" : ""}
        aria-controls="toc-content"
        aria-expanded={!fileData.collapseToc}
      >
        <h3>{i18n(cfg.locale).components.tableOfContents.title}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="fold"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div id="toc-content" class={fileData.collapseToc ? "collapsed" : ""}>
        <ul class="overflow">
          {fileData.toc.map((tocEntry) => {
            const { isReference, displayText } = tocEntryParts(tocEntry)

            return (
              <li key={tocEntry.slug} class={`depth-${tocEntry.depth} ${isReference ? "no-number" : ""}`}>
                <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>
                  {displayText}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
TableOfContents.css = modernStyle
TableOfContents.afterDOMLoaded = script

// The phone-sized counterpart to the sidebar list above. The sidebar has nowhere
// to go on a narrow screen: putting the contents above or below the article
// means scrolling away from what you are reading to use it, so on mobile the
// same list lives in a panel that slides in from the right edge, opened by a
// swipe or by the slim tab pinned to that edge.
const TocDrawer: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
  if (!fileData.toc) {
    return null
  }

  const title = i18n(cfg.locale).components.tableOfContents.title

  return (
    <div class="toc-drawer">
      <button
        type="button"
        class="toc-drawer-tab"
        aria-controls="toc-drawer-panel"
        aria-expanded="false"
        aria-label={title}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div class="toc-drawer-scrim" aria-hidden="true"></div>
      <aside
        id="toc-drawer-panel"
        class="toc-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div class="toc-drawer-header">
          <h3>{title}</h3>
          <button type="button" class="toc-drawer-close" aria-label="Close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <ul class="toc-drawer-list">
          {fileData.toc.map((tocEntry) => {
            const { isReference, displayText } = tocEntryParts(tocEntry)

            return (
              <li
                key={tocEntry.slug}
                class={`depth-${tocEntry.depth} ${isReference ? "no-number" : ""}`}
              >
                <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>
                  {displayText}
                </a>
              </li>
            )
          })}
        </ul>
      </aside>
    </div>
  )
}
TocDrawer.css = drawerStyle
TocDrawer.afterDOMLoaded = drawerScript

const LegacyTableOfContents: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
  if (!fileData.toc) {
    return null
  }
  return (
    <details id="toc" open={!fileData.collapseToc}>
      <summary>
        <h3>{i18n(cfg.locale).components.tableOfContents.title}</h3>
      </summary>
      <ul>
        {fileData.toc.map((tocEntry) => {
          const { isReference, displayText } = tocEntryParts(tocEntry)

          return (
            <li key={tocEntry.slug} class={`depth-${tocEntry.depth} ${isReference ? "no-number" : ""}`}>
              <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>
                {displayText}
              </a>
            </li>
          )
        })}
      </ul>
    </details>
  )
}
LegacyTableOfContents.css = legacyStyle

export const TocDrawerConstructor = (() => TocDrawer) satisfies QuartzComponentConstructor

export default ((opts?: Partial<Options>) => {
  const layout = opts?.layout ?? defaultOptions.layout
  return layout === "modern" ? TableOfContents : LegacyTableOfContents
}) satisfies QuartzComponentConstructor
