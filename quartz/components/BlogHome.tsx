import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, SimpleSlug } from "../util/path"

const BlogHome: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  if (fileData.slug === "index") return null

  const baseDir = resolveRelative(fileData.slug!, "index" as SimpleSlug)

  return (
    <div class="blog-home-container">
      <a href={baseDir} class="blog-home-button">
        <span class="shimmer-symbol">
          <i class="fas fa-home"></i>
        </span>
        home
      </a>
    </div>
  )
}

export default (() => BlogHome) satisfies QuartzComponentConstructor