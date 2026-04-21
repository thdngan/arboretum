import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
// @ts-ignore
import script from "./scripts/_randomPage.inline"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    // Dictionary of icons here
    const iconDict: Record<string, string> = {
      "About": "fas fa-globe-asia",
      "Contact": "fas fa-envelope",
      "GitHub": "fab fa-github", // Just an example if we add it back later!
    }
    const links = opts?.links ?? []
    return (
      // Added a class to the footer so that I can query it for pageup/down
      <footer class={`${displayClass ?? ""} footer`}>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        {/* <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link} target="_blank" rel="noopener">{text}</a>
            </li>
          ))}
        </ul> */}
        <ul>
          {Object.entries(links).map(([text, link]) => {
            // Check if the text matches a key in our dictionary
            const iconClass = iconDict[text] 
            
            return (
              <li>
                <a href={link} target={link.startsWith("http") ? "_blank" : undefined} rel="noopener">
                  {/* If an icon exists in the dictionary, render it with a small margin */}
                  {iconClass && (
                    <span class="shimmer-symbol" style={{ marginRight: "6px" }}>
                      <i class={iconClass}></i>
                    </span>
                  )}
                  {/* Render the text right next to it */}
                  {text}
                </a>
              </li>
            )
          })}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
