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
        <div class={classNames(displayClass, "taglist")}>
        <h3 style="font-size: 1rem;">🏷️ Tags</h3>

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
      
    )
  } else {
    return null
  }
}


TagList.css = `
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.section-li > .section > .tags {
  justify-content: flex-end;
}
  
.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  border-radius: 5px;
  background-color: var(--highlight);
  padding: 0rem 0.4rem;
  margin: 0 0.1rem;
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
