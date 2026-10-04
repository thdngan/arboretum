import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"
import { classNames } from "../util/lang"
import style from "./styles/signpost.scss"

interface Options {
  variant: "banner" | "post"
}

const Signs = ({ displayClass }: Pick<QuartzComponentProps, "displayClass">) => (
  <>
    <button
      class={classNames(displayClass, "signpost-sign", "signpost-guide")}
      type="button"
      data-home-modal="guide"
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-label="Guide: how to get around"
      title="How to get around"
    ></button>
    <button
      class={classNames(displayClass, "signpost-sign", "signpost-seed")}
      type="button"
      data-home-modal="thanks"
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-label="Colophon"
      title="Colophon"
    ></button>
    <a
      class={classNames(displayClass, "signpost-sign", "signpost-about")}
      href="https://thdngan.github.io/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="About: main hub (opens in a new tab)"
      title="Main hub"
    ></a>
  </>
)

export default ((opts: Options) => {
  const Signpost: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const images = `${pathToRoot(fileData.slug!)}/images`

    if (opts.variant === "banner") {
      return (
        <div class={classNames(displayClass, "banner")}>
          <picture>
            <source
              media="not all and (min-width: 1200px)"
              srcset={`${images}/banner-no-signpost.webp`}
              width="2000"
              height="522"
            />
            <img
              id="banner"
              src={`${images}/banner-signpost.webp`}
              alt="Penguins wandering along a shoreline, drawn by hand (by me :v)"
              width="2000"
              height="522"
            />
          </picture>
          <Signs displayClass="wide-only" />
        </div>
      )
    }

    return (
      <div class={classNames(displayClass, "signpost")}>
        <img src={`${images}/signpost.webp`} alt="" width="800" height="797" />
        <Signs />
      </div>
    )
  }

  Signpost.css = style
  return Signpost
}) satisfies QuartzComponentConstructor<Options>
