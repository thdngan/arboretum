import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, SimpleSlug } from "../util/path"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/homeModals.inline"
import style from "./styles/homeModals.scss"

// The dialogs the "getting around" and "colophon" keys open. Rendered once per
// page, separately from KeyRow, so several rows of keys can share one set of
// panels instead of duplicating ids.
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    aria-hidden="true"
  >
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
)

const KeyDialogs: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const lithium = resolveRelative(fileData.slug!, "posts/lithium" as SimpleSlug)
  const neutrino = resolveRelative(fileData.slug!, "posts/neutrino-communication" as SimpleSlug)

  return (
    <div class={classNames(displayClass, "home-modals")}>
    {/* GUIDE */}
    <div
      class="home-modal"
      data-home-modal-panel="guide"
      role="dialog"
      aria-modal="true"
      aria-labelledby="home-modal-guide-title"
    >
      <div class="home-modal-panel">
        <button class="home-modal-close" type="button" aria-label="Close">
          <CloseIcon />
        </button>
        <h3 id="home-modal-guide-title">How to get around</h3>
        <div class="home-modal-body">
          <p>
            You can hop between posts and notes by clicking on{" "}
            <a href={lithium} class="internal">
              links like this
            </a>{" "}
            inside each page, or by using the <strong>interactive map</strong> (on desktop it's on
            the right, on mobile it's at the bottom). Everything else (buttons, keyboard shortcuts, etc.) is explained below:
          </p>

          <table class="guide-keys">
            <thead>
              <tr>
                <th>Button</th>
                <th>What it does</th>
                <th>Shortcut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="guide-buttons">
                  <span class="guide-icon guide-icon--search"></span>
                </td>
                <td>Search the archives</td>
                <td class="guide-shortcut">
                  <kbd>Ctrl</kbd> + <kbd>K</kbd>
                </td>
              </tr>
              <tr>
                <td class="guide-buttons">
                  <span class="guide-icon guide-icon--search"></span>
                </td>
                <td>Search by tag instead</td>
                <td class="guide-shortcut">
                  <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>K</kbd>
                </td>
              </tr>
              <tr>
                <td class="guide-buttons">
                  <span class="guide-icon guide-icon--map"></span>
                </td>
                <td>Open the global map</td>
                <td class="guide-shortcut">
                  <kbd>Ctrl</kbd> + <kbd>G</kbd>
                </td>
              </tr>
              <tr>
                <td class="guide-buttons">
                  <span class="guide-icon guide-icon--dice"></span>
                </td>
                <td>Pick a random post</td>
                <td class="guide-shortcut">
                  <kbd>Shift</kbd> + <kbd>R</kbd>
                </td>
              </tr>
              <tr>
                <td class="guide-buttons">
                  <span class="guide-icon guide-icon--up"></span>
                  <span class="guide-icon guide-icon--down"></span>
                </td>
                <td>Jump to the top / bottom</td>
                <td class="guide-shortcut">&mdash;</td>
              </tr>
              <tr>
                <td class="guide-buttons">
                  <span class="guide-icon guide-icon--plain guide-icon--sun"></span>
                  <span class="guide-icon guide-icon--plain guide-icon--moon"></span>
                </td>
                <td>Flip between light and dark</td>
                <td class="guide-shortcut">&mdash;</td>
              </tr>
              <tr>
                <td class="guide-buttons">
                  <span class="guide-icon guide-icon--plain guide-icon--reader"></span>
                </td>
                <td>Reader mode</td>
                <td class="guide-shortcut">&mdash;</td>
              </tr>
              <tr>
                <td class="guide-buttons"></td>
                <td>Close the search or the map</td>
                <td class="guide-shortcut">
                  <kbd>Esc</kbd>
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            <strong>Reader mode</strong> dims everything around the page so only the writing is
            left. Nothing is gone: on desktop the side panels fade back in when you move the
            cursor over them, and on mobile a tap anywhere brings the top bar and buttons back (tap the page
            again to send it away).
          </p>

          <p>
            On a Mac, press <kbd>&#8984;</kbd> wherever the table says <kbd>Ctrl</kbd>.
          </p>
        </div>
      </div>
    </div>

    {/* ACKNOWLEDGEMENTS */}
    <div
      class="home-modal"
      data-home-modal-panel="thanks"
      role="dialog"
      aria-modal="true"
      aria-labelledby="home-modal-thanks-title"
    >
      <div class="home-modal-panel">
        <button class="home-modal-close" type="button" aria-label="Close">
          <CloseIcon />
        </button>
        <h3 id="home-modal-thanks-title">Colophon</h3>
        <div class="home-modal-body">
          <p>
            I stumbled upon an older version of <a href="https://quartz.jzhao.xyz/">Quartz</a>{" "}
            while trying to figure out how to publish my{" "}
            <a href="https://obsidian.md/">Obsidian</a> notes on a{" "}
            <a href={neutrino} class="internal">
              neutrino application
            </a>
            . What followed was an absolute BLAST and a fair amount of head-scratching as I set up
            my own digital arboretum. Front-end stuff as a complete noob? Equal parts fun and
            frustrating. Weirdly addicting too. 10/10 would recommend... but also,{" "}
            <em>send help</em>.
          </p>
          <p>
            That said, the struggle was so worth it! I picked up a ton of new knowledge along the
            way, and this little blog wouldn't exist without{" "}
            <a href="https://github.com/jackyzha0">Jacky Zhao</a>'s incredible work. Huge thanks
            for making this possible!
          </p>
          <p>
            Also, big shout-out to <a href="https://quartz.eilleeenz.com/">Eilleen</a> for their
            ridiculously helpful Quartz{" "}
            <a href="https://quartz.eilleeenz.com/Quartz-customization-log">customization log</a>,
            those floating buttons are absolute lifesavers!
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

KeyDialogs.css = style
KeyDialogs.afterDOMLoaded = script

export default (() => KeyDialogs) satisfies QuartzComponentConstructor
