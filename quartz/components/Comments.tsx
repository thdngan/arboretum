import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/comments.inline"

type Options = {
  provider: "giscus"
  options: {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string
    themeUrl?: string
    lightTheme?: string
    darkTheme?: string
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
    strict?: boolean
    reactionsEnabled?: boolean
    inputPosition?: "top" | "bottom"
  }
}

function boolToStringBool(b: boolean): string {
  return b ? "1" : "0"
}

export default ((opts: Options) => {
  const Comments: QuartzComponent = ({ displayClass, fileData, cfg }: QuartzComponentProps) => {
    // check if comments should be displayed according to frontmatter

    const disableComment: boolean =
      typeof fileData.frontmatter?.comments !== "undefined" &&
      (!fileData.frontmatter?.comments || fileData.frontmatter?.comments === "false")
    if (disableComment) {
      return <></>
    }

    return (
      <>
      {/* a dinkus, dividing the comments from whatever the page put above them */}
      <div class="dinkus" aria-hidden="true">***</div>
      <h2>💬 Logbook</h2>
      <br />
      {/* <p-code-font>
      <strong>Day 120103 </strong> 
      <br />
      The icy shores are quiet, the stars twinkle above, and the trees... well, they don’t talk back (yet). But you can!
      <br />
      <br />
      </p-code-font> */}
      <div
        class={classNames(displayClass, "giscus")}
        data-repo={opts.options.repo}
        data-repo-id={opts.options.repoId}
        data-category={opts.options.category}
        data-category-id={opts.options.categoryId}
        data-mapping={opts.options.mapping ?? "url"}
        data-strict={boolToStringBool(opts.options.strict ?? true)}
        data-reactions-enabled={boolToStringBool(opts.options.reactionsEnabled ?? true)}
        data-input-position={opts.options.inputPosition ?? "bottom"}
        data-light-theme={opts.options.lightTheme ?? "light"}
        data-dark-theme={opts.options.darkTheme ?? "dark"}
        data-theme-url={
          opts.options.themeUrl ?? `https://${cfg.baseUrl ?? "example.com"}/static/giscus`
        }
      ></div>
      </>
    )
  }

  Comments.afterDOMLoaded = script

  return Comments
}) satisfies QuartzComponentConstructor<Options>
