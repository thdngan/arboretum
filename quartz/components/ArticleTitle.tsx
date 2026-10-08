import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  const icon = fileData.frontmatter?.icon as string | undefined
  const author = fileData.frontmatter?.author as string | undefined
  if (title) {
    return <>
      <h1 class={classNames(displayClass, "article-title")}>
        {icon && (
          <span class="shimmer-symbol" style={{ marginRight: "15px" }}>
            <i class={icon}></i>
          </span>
        )}
      {title}</h1>
      {author && <p class={classNames(displayClass, "article-author")}>{author}</p>}
    </>
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
}

.article-author {
  margin: 0.4rem 0 0.6rem 0;
  font-family: var(--headerFont);
  font-size: calc(1.05rem * var(--textZoom, 1));
  color: var(--darkgray);
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
