import rehypeCitation from "rehype-citation"
import { PluggableList } from "unified"
import { visit } from "unist-util-visit"
import { QuartzTransformerPlugin } from "../types"

export interface Options {
  bibliographyFile: string
  suppressBibliography: boolean
  linkCitations: boolean
  csl: string
}

const defaultOptions: Options = {
  bibliographyFile: "./bibliography.bib",
  suppressBibliography: false,
  linkCitations: false,
  csl: "apa",
}

export const Citations: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "Citations",
    htmlPlugins(ctx) {
      const plugins: PluggableList = []

      // Add rehype-citation to the list of plugins
      plugins.push([
        rehypeCitation,
        {
          bibliography: opts.bibliographyFile,
          suppressBibliography: opts.suppressBibliography,
          linkCitations: opts.linkCitations,
          csl: opts.csl,
          lang: ctx.cfg.configuration.locale ?? "en-US",
        },
      ])

      // // Transform the HTML of the citattions; add data-no-popover property to the citation links
      // // using https://github.com/syntax-tree/unist-util-visit as they're just anochor links
      // plugins.push(() => {
      //   return (tree, _file) => {
      //     visit(tree, "element", (node, _index, _parent) => {
      //       if (node.tagName === "a" && node.properties?.href?.startsWith("#bib")) {
      //         node.properties["data-no-popover"] = true
      //       }
      //     })
      //   }
      // })

      plugins.push(() => {
        return (tree, _file) => {
          const citeCounts: Record<string, number> = {}

          visit(tree, "element", (node: any) => {
            if (node.tagName === "a" && typeof node.properties?.href === "string" && node.properties.href.startsWith("#bib-")) {
              node.properties["data-no-popover"] = true
              
              const refId = node.properties.href.substring(1)
              if (!citeCounts[refId]) citeCounts[refId] = 0
              citeCounts[refId]++
              
              node.properties.id = `cite-${refId}-${citeCounts[refId]}`
            }
          })

          visit(tree, "element", (node: any) => {
            if (node.tagName === "div" && typeof node.properties?.id === "string" && node.properties.id.startsWith("bib-")) {
              const refId = node.properties.id
              const count = citeCounts[refId] || 0
              
              if (count > 0) {
                node.children.push({ type: "text", value: " " })
                
                for (let i = 1; i <= count; i++) {
                  const citeId = `cite-${refId}-${i}`
                  const linkChildren: any[] = [{ type: "text", value: "↩" }]
                  
                  if (i > 1) {
                    linkChildren.push({
                      type: "element",
                      tagName: "sup",
                      properties: {},
                      children: [{ type: "text", value: `${i}` }]
                    })
                  }
                  
                  node.children.push({
                    type: "element",
                    tagName: "a",
                    properties: {
                      href: `#${citeId}`,
                      className: ["internal", "footnote-backref"],
                      "data-no-popover": true
                    },
                    children: linkChildren
                  })
                  
                  if (i < count) {
                     node.children.push({ type: "text", value: " " })
                  }
                }
              }
            }
          })
        }
      })

      return plugins
    },
  }
}
