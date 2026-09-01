import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, SimpleSlug } from "../util/path"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/homeModals.inline"
import style from "./styles/homeModals.scss"

// the two panels the landing page can pop open. keeping the guide and the
// acknowledgements in here (instead of in _index.md) keeps the markdown short,
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

const HomeModals: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const lithium = resolveRelative(fileData.slug!, "posts/lithium" as SimpleSlug)
  const neutrino = resolveRelative(fileData.slug!, "posts/neutrino-communication" as SimpleSlug)

  return (
    <div class={classNames(displayClass, "home-modals")}>
      <div class="home-modal-buttons">
        <button
          class="home-modal-button"
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
        <button
          class="home-modal-button"
          type="button"
          data-home-modal="thanks"
          aria-haspopup="dialog"
          aria-expanded="false"
        >
          <span class="shimmer-symbol">
            <i class="fas fa-seedling" aria-hidden="true"></i>
          </span>
          colophon
        </button>
        {/* not a dialog trigger: leaves for the main site, same globe the
            footer's "About" link uses for the same destination */}
        <a
          class="home-modal-button"
          href="https://thdngan.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Main hub (opens in a new tab)"
        >
          <span class="shimmer-symbol">
            <i class="fas fa-globe-asia" aria-hidden="true"></i>
          </span>
          main hub
          <span class="home-modal-button-external" aria-hidden="true">
            &#8599;
          </span>
        </a>
      </div>

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
          <h3 id="home-modal-guide-title">Directions for the Disoriented</h3>
          <div class="home-modal-body">
            <p>
              You can hop between posts and notes by clicking on{" "}
              <a href={lithium} class="internal">
                links like this
              </a>{" "}
              inside each page, or by using the <strong>interactive map</strong> (on desktop it's on
              the right, on mobile it's at the bottom). Everything else lives in the{" "}
              <strong>search box</strong> (up in the sidebar), the buttons at the bottom right, or
              on your keyboard:
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
                  <td>Dig through the archives</td>
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
                  <td class="guide-buttons"></td>
                  <td>Close the search or the map</td>
                  <td class="guide-shortcut">
                    <kbd>Esc</kbd>
                  </td>
                </tr>
              </tbody>
            </table>

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

HomeModals.css = style
HomeModals.afterDOMLoaded = script

export default (() => HomeModals) satisfies QuartzComponentConstructor
