import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, SimpleSlug } from "../util/path"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/homeModals.inline"
import style from "./styles/homeModals.scss"

// The keycap row. Only renders the buttons - the dialogs they open live in
// KeyDialogs, so a page can carry more than one row (a desktop sidebar copy and
// a mobile in-flow copy, say) without duplicating panel markup or ids.
export type KeyName = "home" | "guide" | "colophon" | "hub"

// In the sidebar these two shrink to icon-only squares. Their glyphs carry the
// meaning on their own, and mixing a square with a wide key stops the column
// being a stack of identical full-width rectangles under the map panel.
const COMPACT_IN_SIDEBAR: KeyName[] = ["home", "colophon"]

interface KeyRowOptions {
  keys: KeyName[]
  // one key per row whatever the viewport; for the narrow right sidebar
  stack?: boolean
}

export default ((opts: KeyRowOptions) => {
  const KeyRow: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const home = resolveRelative(fileData.slug!, "index" as SimpleSlug)
    const isCompact = (key: KeyName) => !!opts.stack && COMPACT_IN_SIDEBAR.includes(key)

    // squares first, so the wide key that follows fills out the rest of the row
    // rather than being stranded on a line of its own (Array.sort is stable, so
    // the authored order survives within each group)
    const keys = opts.stack
      ? [...opts.keys].sort((a, b) => Number(isCompact(b)) - Number(isCompact(a)))
      : opts.keys

    const cls = (key: KeyName) =>
      isCompact(key) ? "home-modal-button home-modal-button--compact" : "home-modal-button"

    const render = (key: KeyName) => {
      switch (key) {
        case "home":
          return (
            <a
              key={key}
              class={cls(key)}
              href={home}
              title={isCompact(key) ? "Home" : undefined}
              aria-label="Home"
            >
              <span class="shimmer-symbol">
                <i class="fas fa-home" aria-hidden="true"></i>
              </span>
              {!isCompact(key) && "home"}
            </a>
          )
        case "guide":
          return (
            <button
              key={key}
              class={cls(key)}
              type="button"
              data-home-modal="guide"
              aria-haspopup="dialog"
              aria-expanded="false"
            >
              <span class="shimmer-symbol">
                <i class="fas fa-compass" aria-hidden="true"></i>
              </span>
              getting around
            </button>
          )
        case "colophon":
          return (
            <button
              key={key}
              class={cls(key)}
              type="button"
              data-home-modal="thanks"
              aria-haspopup="dialog"
              aria-expanded="false"
              title={isCompact(key) ? "Colophon" : undefined}
              aria-label={isCompact(key) ? "Colophon" : undefined}
            >
              <span class="shimmer-symbol">
                <i class="fas fa-seedling" aria-hidden="true"></i>
              </span>
              {!isCompact(key) && "colophon"}
            </button>
          )
        case "hub":
          return (
            <a
              key={key}
              class={cls(key)}
              href="https://thdngan.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              title={isCompact(key) ? "Main hub (opens in a new tab)" : undefined}
              aria-label="Main hub (opens in a new tab)"
            >
              <span class="shimmer-symbol">
                <i class="fas fa-globe-asia" aria-hidden="true"></i>
              </span>
              {!isCompact(key) && (
                <>
                  main hub
                  <span class="home-modal-button-external" aria-hidden="true">
                    &#8599;
                  </span>
                </>
              )}
            </a>
          )
      }
    }

    return (
      <div
        class={classNames(
          displayClass,
          "home-modal-buttons",
          ...(opts.stack ? ["home-modal-buttons--stack"] : []),
        )}
      >
        {keys.map(render)}
      </div>
    )
  }

  KeyRow.css = style
  KeyRow.afterDOMLoaded = script
  return KeyRow
}) satisfies QuartzComponentConstructor<KeyRowOptions>
