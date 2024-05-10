import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"

export const Quoting: QuartzTransformerPlugin = () => ({
  name: "Quoting",
  markdownPlugins() {
    return [
      () => (tree: Root, _file) => {
        visit(tree, "code", (node) => {
          if (node.lang === "quoting") {
            node.type = "html" as "code"
            node.value = `<pre class="quoting">${node.value}</pre>`
          }
        })
      },
    ]
  },
})