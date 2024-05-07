import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🐧 The Arboretum", /**🐧 */
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    baseUrl: "thdngan.github.io/quartz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk", /** Schibsted Grotesk, Chelsea Market*/
        body: "Roboto Serif", /**Source Sans Pro */
        code: "IBM Plex Mono", /**IBM Plex Mono */
      },
      colors: {
        lightMode: {
          light: "#EEEEEE", /**faf8f8 for background                                             ; #FFFFFF*/
          lightgray: "rgba(117, 129, 107,0.4)", /**e5e5e5 for background of search and borders   ; rgba(117, 129, 107,0.4)*/
          gray: "#7C8B95", /**b8b8b8 for date and reading time, graph links, heavier borders     ; #7C8B95*/
          darkgray: "#000000", /**4e4e4e for text                                                ; #000000*/
          dark: "#1F4172", /**2b2b2b for headings and icons                                      ; #003153*/
          secondary: "#B7657B", /**284b63 for titles and links, current graph node               ; #996515*/
          tertiary: "#61C0BF", /**84a59d for when hovering above link                            ; #457B9D*/
          highlight: "rgba(143, 159, 169, 0.15)", /**rgba(143, 159, 169, 0.15) for background of internal link   ; rgba(117, 129, 107, 0.15)*/
        },
        darkMode: {
          light: "#3C3633", /**161618 ,#0d1210, 1A2421, #141716*/
          lightgray: "rgba(225, 227, 221,0.3)",
          gray: "#646464",
          darkgray: "#EAEAEA",
          dark: "#ECBC55",
          secondary: "#85CFCB",
          tertiary: "#F39189",
          highlight: "rgba(143, 159, 169, 0.2)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
