// @ts-ignore
import darkmodeScript from "./scripts/darkmode.inline"
import styles from "./styles/darkmode.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

// Styled after the theme switch on minimal.guide (Obsidian Publish): the button
// itself is the pill track, its ::after is the sliding knob, and the sun/moon
// icon sits in whichever half of the track the knob has vacated.
const Darkmode: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
  return (
    <button class={classNames(displayClass, "darkmode")} type="button" role="switch" aria-checked="false">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="dayIcon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-label={i18n(cfg.locale).components.themeToggle.darkMode}
      >
        <title>{i18n(cfg.locale).components.themeToggle.darkMode}</title>
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
        <path d="M22 12h-2"></path>
        <path d="m19.07 19.07-1.41-1.41"></path>
        <path d="M12 22v-2"></path>
        <path d="m4.93 19.07 1.41-1.41"></path>
        <path d="M2 12h2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="nightIcon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-label={i18n(cfg.locale).components.themeToggle.lightMode}
      >
        <title>{i18n(cfg.locale).components.themeToggle.lightMode}</title>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>
    </button>
  )
}

Darkmode.beforeDOMLoaded = darkmodeScript
Darkmode.css = styles

export default (() => Darkmode) satisfies QuartzComponentConstructor
