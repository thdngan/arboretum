import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"
import { toString } from "mdast-util-to-string"
import Slugger from "github-slugger"

export interface Options {
  maxDepth: 1 | 2 | 3 | 4 | 5 | 6
  minEntries: number
  showByDefault: boolean
  collapseByDefault: boolean
}

const defaultOptions: Options = {
  maxDepth: 3,
  minEntries: 1,
  showByDefault: true,
  collapseByDefault: false,
}

interface TocEntry {
  depth: number
  text: string
  slug: string // this is just the anchor (#some-slug), not the canonical slug
}

const slugAnchor = new Slugger()

export const TableOfContents: QuartzTransformerPlugin<Partial<Options> | undefined> = (
  userOpts
) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "TableOfContents",
    markdownPlugins() {
      return [
        () => {
          return async (tree: Root, file) => {
            const display = file.data.frontmatter?.enableToc ?? opts.showByDefault
            if (display) {
              slugAnchor.reset()
              const toc: TocEntry[] = []
              let highestDepth: number = opts.maxDepth
              let currentNumber: number[] = Array(opts.maxDepth).fill(0)
              let minDepth = Infinity // To find the minimum depth

              // First pass to find the minimum depth
              visit(tree, "heading", (node) => {
                if (node.depth <= opts.maxDepth) {
                  minDepth = Math.min(minDepth, node.depth)
                }
              })

              // Second pass to build TOC
              visit(tree, "heading", (node) => {
                if (node.depth <= opts.maxDepth) {
                  const adjustedDepth = node.depth - minDepth + 1
                  currentNumber[adjustedDepth - 1]++
                  // Reset numbering for deeper levels
                  for (let i = adjustedDepth; i < currentNumber.length; i++) {
                    currentNumber[i] = 0
                  }
                  const label = currentNumber.slice(0, adjustedDepth).join(".")
                  const text = toString(node)
                  highestDepth = Math.min(highestDepth, adjustedDepth)
                  toc.push({
                    depth: adjustedDepth,
                    text: `${label}. ${text}`,
                    slug: slugAnchor.slug(text),
                  })
                }
              })

              if (toc.length > 0 && toc.length > opts.minEntries) {
                file.data.toc = toc.map((entry) => ({
                  ...entry,
                  depth: entry.depth - highestDepth + 1, // Normalize to start from 1
                }))
                file.data.collapseToc = opts.collapseByDefault
              }
            }
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    toc: TocEntry[]
    collapseToc: boolean
  }
}
