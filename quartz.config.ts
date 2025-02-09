import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import * as Component from "./quartz/components"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "L'arboretum", /**🐧 */
    enableSPA: true,
    enablePopovers: false,
    analytics: {
      provider: "plausible",
    },
    baseUrl: "thdngan.github.io/arboretum",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "JetBrains", /** Schibsted Grotesk, Chelsea Market,Libre Baskerville*/
        body: "Inter", /**Source Sans Pro, Roboto Serif */
        code: "JetBrains Mono", /**IBM Plex Mono */
      },
      colors: {
        lightMode: {
          light: "#f5f5f5", /**faf8f8 for background                                             ; #FFFFFF, f5f5f5*/
          lightgray: "rgba(105, 137, 150,0.2)", /**e5e5e5 for background of search             ;rgba(117, 129, 107,0.4)*/
          gray: "#E06C75", /**b8b8b8 for date and reading time, graph links, heavier borders     ; #7C8B95*/
          darkgray: "#1F1F1F", /**4e4e4e for text                                                ; #000000*/
          dark: "#000000", /**2b2b2b for headings and icons                                      ; #1F4172*/
          secondary: "#10736C", /**284b63 for titles and links, current graph node               ; #6C5A37*/
          tertiary: "#d2940f", /**84a59d for when hovering above link                            ; #457B9D*/
          highlight: "rgba(171, 196, 193, 0.1)", /**rgba(143, 159, 169, 0.15) for background of internal link   ; rgba(117, 129, 107, 0.15)*/

          nodefirst: "#35827d",
          nodesecond: "#9ad6d2",
          nodethird: "#c678dd",
          nodevisited: "#e5c07b",
          border: "rgba(105, 137, 150,0.2)",
          link: "rgba(105, 137, 150,0.2)",

          wikiheading: "#c8d0ca",
          wikibackground: "#ebebeb",
          wikiborder: "#a3a3a3",

          gradient1: "#310979",
          gradient2: "#00d4ff",
          italic: "#1F1F1F",
        },
          ////////////   ATOME ONE DARK THEME /////////////
          // #abb2bf: light grey (normal text)
          // #c678dd: purple (keyword)
          // #56b6c2: cyan/green (builtin)
          // #61afef: light/baby blue (definition)
          // #5c6370: Dark grey (comments)
          // #98c379: green (string)
          // #d19a66: orange (number)
          // #e5c07b: yellow (instance)
          // #E06C75: redish?
          // #4Dff0000
        darkMode: {
          light: "#282c34", /**background: 161618 ,#0d1210, 1A2421, #141716, #2F3037*/
          lightgray: "rgba(224, 224, 224,0.2)", /*background of search, inline code and borders: rgba(224, 224, 224,0.25),rgba(175, 62, 77,0.5) */
          gray: "#c678dd", /* date and reading time, graph links, heavier borders: b8b8b8 */
          darkgray: "#abb2bf",/*text: EAEAEA  */
          dark: "#d6d6d6",     /* headings and icons, search text: ECBC55, ECB159, F5B700, C2C2C2, FFFFFF*/
          secondary: "#7d9a69", /*titles and links, current graph node: 85CFCB, dda169, 86b8b5 */
          tertiary: "#E06C75",/*for when hovering above link: 709997*/
          highlight: "rgba(166, 221, 219, 0.1)", /*background of internal link */

          nodefirst: "#E06C75",
          nodesecond: "#98c379",
          nodethird: "#c678dd",
          nodevisited: "#61afef",
          border: "rgba(224, 224, 224,0.5)",
          link: "rgba(224, 224, 224,0.25)",

          wikiheading: "#67796b",
          wikibackground: "#42434d",
          wikiborder: "#a3a3a3",

          gradient1: "#00e2ff",
          gradient2: "#f5b0ff",
          italic: "#abb2bf", /*EAEAEA */
        },
      },
    },
  },



// #9E1946: amaranth purple
// #AA6373: china rose
// #FF9F1C: orange peel
// #e08300: fulvous (orange)


  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      // Plugin.Remark42({ host: "https://thdngan.github.io/arboretum/", site_id: "remark", no_footer: true }),
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
      Plugin.Remark42({ host: "https://thdngan.github.io/arboretum/", site_id: "remark", theme: "dark", no_footer: true }),
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
