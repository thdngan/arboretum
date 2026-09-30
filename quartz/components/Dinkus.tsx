import { QuartzComponent, QuartzComponentConstructor } from "./types"
import style from "./styles/dinkus.scss"

interface DinkusOptions {
  mobileOnly?: boolean
}

export default ((opts?: DinkusOptions) => {
  const Dinkus: QuartzComponent = () => (
    <hr class={opts?.mobileOnly ? "dinkus dinkus--mobile" : "dinkus"} />
  )

  Dinkus.css = style
  return Dinkus
}) satisfies QuartzComponentConstructor<DinkusOptions>
