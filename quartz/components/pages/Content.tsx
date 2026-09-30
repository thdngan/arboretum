import { Root, RootContent } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/emptyContent.scss"

const emptyMessage = [
  // "Whoops... There's nothing here (yet)!",
  "Empty for now!",
  "Please come back next week or next year :-)",
  // "(“later” could be anything from next week to next year)"
]

const meaningfulTags = new Set(["img", "video", "audio", "iframe", "embed", "object", "svg"])

function hasContent(node: Root | RootContent): boolean {
  switch (node.type) {
    case "text":
      return node.value.trim().length > 0
    case "element":
      return meaningfulTags.has(node.tagName) || node.children.some(hasContent)
    case "root":
      return node.children.some(hasContent)
    default:
      return false
  }
}

export default (() => {
  const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
    const classes: string[] = fileData.frontmatter?.cssclasses ?? []
    const classString = ["popover-hint", ...classes].join(" ")

    if (!hasContent(tree as Root)) {
      return (
        <article class={classString}>
          <p class="empty-content">
            {emptyMessage.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </article>
      )
    }

    const content = htmlToJsx(fileData.filePath!, tree)
    return <article class={classString}>{content}</article>
  }

  Content.css = style
  return Content
}) satisfies QuartzComponentConstructor
