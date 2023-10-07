import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

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
      typography: {
        header: "Schibsted Grotesk", /** Schibsted Grotesk, Chelsea Market*/
        body: "Roboto Serif", /**Source Sans Pro */
        code: "IBM Plex Mono", /**IBM Plex Mono */
      },
      colors: {
        lightMode: {
          light: "#FFFFFF", /**faf8f8 for background*/
          lightgray: "rgba(117, 129, 107,0.4)", /**e5e5e5 for background of search and borders*/
          gray: "#7C8B95", /**b8b8b8 for date and reading time, graph links, heavier borders*/
          darkgray: "#000000", /**4e4e4e for text*/
          dark: "#003153", /**2b2b2b for headings and icons*/
          secondary: "#996515", /**284b63 for titles and links, current graph node*/
          tertiary: "#457B9D", /**84a59d for when hovering above link*/
          highlight: "rgba(117, 129, 107, 0.15)", /**rgba(143, 159, 169, 0.15) for background of internal link*/
        },
        darkMode: {
          light: "#141716", /**161618 ,#0d1210, 1A2421*/
          lightgray: "rgba(225, 227, 221,0.3)",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#bd9a60",
          tertiary: "#2A9D8F",
          highlight: "rgba(58, 176, 158, 0.3)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"], // you can add 'git' here for last modified from Git but this makes the build slower
      }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
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
