import { Root, RootContent } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/emptyContent.scss"

// Shown in place of the article body when a note is still just frontmatter.
// One entry per line; the stylesheet blocks them out, so add or drop a line
// here rather than threading <br>s through the string.
const emptyMessage = [
  // "Whoops... There's nothing here (yet)!",
  "Empty for now!",
  "Please come back later :-)",
  "(“later” could be anything from next week to next year)"
]

// Elements that carry a page's meaning without any text of their own, so a body
// holding only one of these is not empty.
const meaningfulTags = new Set(["img", "video", "audio", "iframe", "embed", "object", "svg"])

// A body is empty when it renders nothing a reader could read: no text beyond
// whitespace and none of the tags above. Walking the tree rather than checking
// `children.length` keeps wrappers the transformers add (a lone empty <p>, a
// section div) from counting as content.
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
