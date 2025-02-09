import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { OptionType } from "../plugins/types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

import script from "./scripts/_randomPage.inline"

interface Optionss {
  links: Record<string, string>
}

export default ((opts?: Optionss) => {
  function Footer({ displayClass,cfg }: QuartzComponentProps) {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
    <footer class={`${displayClass ?? ""} footer`}>
        {/* <hr /> */}
        <div class="giscus"></div>
        {/* <hr /> */}
        {/* <div id="remark42"></div> */}
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  Footer.afterDOMLoaded = script
  return Footer
}) satisfies QuartzComponentConstructor