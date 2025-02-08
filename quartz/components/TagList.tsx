import { pathToRoot, slugTag } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/taglist.scss"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

// function TagList({ fileData, displayClass,cfg }: QuartzComponentProps) => {
const TagList: QuartzComponent = ({
  fileData,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
  const baseDir = pathToRoot(fileData.slug!)
  if (tags && tags.length > 0) {
    return (
      // <h3>Tag List</h3>
      // <div class="section">
        // <div class="desc">
        <div class={classNames(displayClass, "taglist")}>
        <h3>{i18n(cfg.locale).components.taglist.title}</h3>
        
        <ul class={`tags ${displayClass ?? ""}`}>
        {tags.map((tag) => {
          const display = `${tag}`
          const linkDest = baseDir + `/tags/${slugTag(tag)}`
          return (
            <li>
              <a href={linkDest} class="internal tag-link">
                {display}
              </a>
            </li>
          )
        })}
        </ul>
        </div>
        // </div>
        
      // </div>
      
    )
  } else {
    return null
  }
}

TagList.css = style
export default (() => TagList) satisfies QuartzComponentConstructor