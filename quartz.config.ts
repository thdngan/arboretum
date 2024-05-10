import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "L'arboretum", /**🐧 */
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
        header: "Inter", /** Schibsted Grotesk, Chelsea Market*/
        body: "Poppins", /**Source Sans Pro, Roboto Serif */
        code: "JetBrains Mono", /**IBM Plex Mono */
      },
      colors: {
        lightMode: {
          light: "#EAEAEA", /**faf8f8 for background                                             ; #FFFFFF*/
          lightgray: "rgba(200, 183, 146,0.7)", /**e5e5e5 for background of search and borders   ; rgba(117, 129, 107,0.4)*/
          gray: "#7C8B95", /**b8b8b8 for date and reading time, graph links, heavier borders     ; #7C8B95*/
          darkgray: "#000000", /**4e4e4e for text                                                ; #000000*/
          dark: "#000000", /**2b2b2b for headings and icons                                      ; #1F4172*/
          secondary: "#6C5A37", /**284b63 for titles and links, current graph node               ; #B7657B*/
          tertiary: "#AD925C", /**84a59d for when hovering above link                            ; #457B9D*/
          highlight: "rgba(213, 200, 174, 0.5)", /**rgba(143, 159, 169, 0.15) for background of internal link   ; rgba(117, 129, 107, 0.15)*/
        },
        darkMode: {
          light: "#212227", /**161618 ,#0d1210, 1A2421, #141716*/
          lightgray: "rgba(224, 224, 224,0.25)",
          gray: "#646464",
          darkgray: "#EAEAEA",
          dark: "#C2C2C2",     /* ECBC55, ECB159, F5B700*/
          secondary: "#dda169", /*85CFCB */
          tertiary: "#865a32",
          highlight: "rgba(216, 183, 151, 0.1)",
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
      Plugin.Quoting(),
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
