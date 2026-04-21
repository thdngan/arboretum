import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, SimpleSlug } from "../util/path"

const BlogHome: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  // Hide this button if we are already on the index page
  if (fileData.slug === "index") return null

  // Calculate the path back to the index page
  const baseDir = resolveRelative(fileData.slug!, "index" as SimpleSlug)

  return (
    <div class="blog-home-container">
      <a href={baseDir} class="blog-home-button">
        <span class="shimmer-symbol" style={{ marginRight: "12px" }}>
          <i class="fas fa-home"></i>
        </span>
        Home
      </a>
    </div>
  )
}

export default (() => BlogHome) satisfies QuartzComponentConstructor