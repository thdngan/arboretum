// @ts-ignore
import typographyScript from "./scripts/typography.inline"
import styles from "./styles/typography.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { BODY_FONTS, DEFAULT_FONT_ID, fontStack } from "../util/bodyFonts"

// A reader's typography menu: which face the prose is set in, and how big.
// Only the body face is offered — headings stay on the configured header font
// so the site keeps its voice — and the size control scales the article alone,
// never the surrounding chrome.
const Typography: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  // The layout renders one copy for the desktop header and one for the mobile
  // bar, so the panel's id has to differ between them or aria-controls on both
  // buttons would point at whichever panel came first. The copies differ by
  // displayClass (desktop-only / mobile-only), which makes a stable suffix.
  const panelId = displayClass ? `typography-panel-${displayClass}` : "typography-panel"
  // Sorted here rather than in bodyFonts.ts, so the list stays alphabetical in
  // the menu however the table itself is grouped or added to later.
  const fonts = [...BODY_FONTS].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div class={classNames(displayClass, "typography-control")}>
      <button
        class="typography-toggle"
        aria-expanded="false"
        aria-controls={panelId}
        aria-label="Reading typography"
        title="Reading typography"
      >
        {/* Set in the live body font, so the button previews the current choice.
            Cap height runs 649/1000em (Alegreya) to 749 (Merriweather) across
            the offered faces, so 27 in a 21-unit box puts the tallest just
            inside the top edge and the shortest at ~83% of it — near enough the
            same optical height as the moon and the book either side.
            The two sizes are tspans of one <text> rather than separate elements,
            so the small a is placed by the font's own advance width and cannot
            collide with the A on a wide face. */}
        <svg viewBox="0 0 30 21" width="29" height="20" aria-hidden="true">
          <text
            x="15"
            y="20"
            text-anchor="middle"
            font-family="var(--bodyFont)"
            fill="currentColor"
          >
            <tspan font-size="27">A</tspan>
            <tspan font-size="18">a</tspan>
          </text>
        </svg>
      </button>

      <div class="typography-panel" id={panelId} role="dialog" aria-label="Reading typography" hidden>
        <div class="typography-row">
          <span class="typography-label">Text size</span>
          <div class="typography-stepper">
            <button type="button" data-size-step="-1" aria-label="Smaller text">&minus;</button>
            <span class="typography-size" data-size-value aria-live="polite">100%</span>
            <button type="button" data-size-step="1" aria-label="Larger text">+</button>
          </div>
        </div>

        <span class="typography-label typography-label-block">Body face</span>
        <ul class="typography-fonts">
          {fonts.map((f) => (
            <li>
              <button
                type="button"
                class="typography-font"
                data-font={f.id}
                aria-pressed="false"
                style={`font-family: ${fontStack(f)}`}
              >
                <span class="typography-font-head">
                  <span class="typography-font-name">{f.name}</span>
                  <span class="typography-badges">
                    {f.id === DEFAULT_FONT_ID && (
                      <span class="typography-badge" title="What the site opens with">
                        default
                      </span>
                    )}
                    {f.noVietnamese && (
                      <span class="typography-warn" title="No Vietnamese glyphs — falls back mid-word">
                        no&nbsp;VN
                      </span>
                    )}
                  </span>
                </span>
                <span class="typography-font-sample">Nghiêng ế ệ ữ ộ</span>
                <span class="typography-font-note">{f.note}</span>
              </button>
            </li>
          ))}
        </ul>

        <button type="button" class="typography-reset" data-typography-reset>
          Reset to defaults
        </button>
      </div>
    </div>
  )
}

Typography.beforeDOMLoaded = typographyScript
Typography.css = styles

export default (() => Typography) satisfies QuartzComponentConstructor
