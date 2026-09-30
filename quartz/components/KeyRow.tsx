import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, SimpleSlug } from "../util/path"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/homeModals.inline"
import style from "./styles/homeModals.scss"

export type KeyName = "home" | "guide" | "colophon" | "hub"

const SHORT_KEYS: KeyName[] = ["home", "colophon"]

interface KeyRowOptions {
  keys: KeyName[]
  stack?: boolean
}

export default ((opts: KeyRowOptions) => {
  const KeyRow: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const home = resolveRelative(fileData.slug!, "index" as SimpleSlug)
    const isCompact = (key: KeyName) => !!opts.stack && SHORT_KEYS.includes(key)

    const keys = opts.keys

    const cls = (key: KeyName) => {
      if (isCompact(key)) return "home-modal-button home-modal-button--compact"
      if (SHORT_KEYS.includes(key)) return "home-modal-button home-modal-button--short"
      return "home-modal-button"
    }

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
          ...(!opts.stack && opts.keys.length === 2 ? ["home-modal-buttons--pair"] : []),
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
