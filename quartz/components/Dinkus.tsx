import { QuartzComponent, QuartzComponentConstructor } from "./types"
import style from "./styles/dinkus.scss"

interface DinkusOptions {
  // hide above the $mobile breakpoint, for pairing with MobileOnly blocks
  mobileOnly?: boolean
}

// An <hr>, so it renders through the same rule as a dinkus written as `---` in
// a post rather than as a second, near-identical implementation.
export default ((opts?: DinkusOptions) => {
  const Dinkus: QuartzComponent = () => (
    <hr class={opts?.mobileOnly ? "dinkus dinkus--mobile" : "dinkus"} />
  )

  Dinkus.css = style
  return Dinkus
}) satisfies QuartzComponentConstructor<DinkusOptions>
