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

const incompleteMessage = [
  "Unfinished for now!",
  // "The rest should show up next week or next year :-)",
]

const Notice = ({ lines }: { lines: string[] }) => (
  <p class="empty-content">
    {lines.map((line) => (
      <span key={line}>{line}</span>
    ))}
  </p>
)

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

function isReferencesHeading(node: RootContent): boolean {
  return node.type === "element" && node.tagName === "h2" && node.properties?.id === "references"
}

export default (() => {
  const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
    const classes: string[] = fileData.frontmatter?.cssclasses ?? []
    const classString = ["popover-hint", ...classes].join(" ")

    if (!hasContent(tree as Root)) {
      return (
        <article class={classString}>
          <Notice lines={emptyMessage} />
        </article>
      )
    }

    const isIncompletePost =
      fileData.slug?.startsWith("posts/") && fileData.frontmatter?.tags?.includes("incomplete")
    if (!isIncompletePost) {
      const content = htmlToJsx(fileData.filePath!, tree)
      return <article class={classString}>{content}</article>
    }

    const { children } = tree as Root
    const references = children.findIndex(isReferencesHeading)
    const end = references === -1 ? children.length : references
    const toJsx = (nodes: RootContent[]) =>
      htmlToJsx(fileData.filePath!, { type: "root", children: nodes } as Root)
    return (
      <article class={classString}>
        {toJsx(children.slice(0, end))}
        <Notice lines={incompleteMessage} />
        {toJsx(children.slice(end))}
      </article>
    )
  }

  Content.css = style
  return Content
}) satisfies QuartzComponentConstructor
