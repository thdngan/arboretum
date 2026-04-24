import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  const icon = fileData.frontmatter?.icon as string | undefined
  if (title) {
    return <h1 class={classNames(displayClass, "article-title")}>
        {icon && (
          <span class="shimmer-symbol" style={{ marginRight: "15px" }}>
            <i class={icon}></i>
          </span>
        )}
      {title}</h1>
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
