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
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "thdngan.github.io/arboretum",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "JetBrains", /** Schibsted Grotesk, Chelsea Market,Libre Baskerville*/
        // body: "Noto Sans", /**Source Sans Pro, Roboto Serif */
        // body: "Roboto Slab", /**Source Sans Pro, Roboto Serif */
        // body: "Inter", /**Source Sans Pro, Roboto Serif */
        body: "Atkinson Hyperlegible Next",
        // body: "Source Sans 3 ",
        code: "JetBrains Mono", /**IBM Plex Mono */
        // code: "Atkinson Hyperlegible Mono",
      },
      colors: {
        lightMode: {
          light: "#f5f5f5", /**faf8f8 for background                                             ; #FFFFFF, f5f5f5*/
          lightgray: "rgba(105, 137, 150,0.2)", /**e5e5e5 for background of search             ;rgba(117, 129, 107,0.4), rgba(105, 137, 150,0.2)*/
          gray: "#0c5a55", /**b8b8b8 for date and reading time, graph links, heavier borders     ; #7C8B95, d43542*/
          darkgray: "#3d3d3d", /**4e4e4e for text                                                ; #000000*/
          dark: "#292929", /**2b2b2b for headings and icons                                      ; #1F4172*/
          secondary: "#10736C", /**284b63 for titles and links, current graph node               ; #6C5A37; #8bbf9f*/
          tertiary: "#d2940f", /**84a59d for when hovering above link                            ; #457B9D*/
          highlight: "rgba(171, 196, 193, 0.3)", /**rgba(143, 159, 169, 0.15) for background of internal link   ; rgba(117, 129, 107, 0.15)*/
          textHighlight: "#fff23688",

          nodefirst: "#E06C75", /**35827d */
          nodesecond: "#8bd0cb",
          nodethird: "#c678dd",
          nodevisited: "#e5c07b",
          // nodefirst: "#E06C75",
          // nodesecond: "#98c379",
          // nodethird: "#c678dd",
          // nodevisited: "#61afef", 
          border: "rgba(105, 137, 150,0.3)",
          link: "rgba(105, 137, 150,0.1)",

          wikiheading: "#c8d0ca",
          wikibackground: "#ebebeb",
          wikiborder: "#a3a3aa",

          gradient1: "#310979",
          gradient2: "#00d4ff",
          italic: "#3d3d3d",
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
          // light: "#1b1d23", /**background: 161618 ,#0d1210, 1A2421, #141716, #2F3037, #282c34*/
          // lightgray: "rgba(224, 224, 224,0.2)", /*background of search, inline code and borders: rgba(224, 224, 224,0.25),rgba(175, 62, 77,0.5) */
          // gray: "#c678dd", /* date and reading time, graph links, heavier borders: b8b8b8 */
          // darkgray: "#abb2bf",/*text: EAEAEA  */
          // dark: "#d6d6d6",     /* headings and icons, search text: ECBC55, ECB159, F5B700, C2C2C2, FFFFFF*/
          // secondary: "#8ab86b", /*titles and links, current graph node: 85CFCB, dda169, 86b8b5 */
          // tertiary: "#E06C75",/*for when hovering above link: 709997*/
          // highlight: "rgba(61, 80, 50, 0.8)", /*background of internal link */
          // textHighlight: "#b3aa0288",

          // nodefirst: "#E06C75",
          // nodesecond: "#98c379",
          // nodethird: "#c678dd",
          // nodevisited: "#61afef", 
          light: "#1b1d23",          // background (light → dark equivalent)
          lightgray: "rgba(224, 224, 224,0.2)", // background of search, inline code and borders
          gray: "#86acaa",           // date and reading time, graph links, heavier borders, c678dd
          darkgray: "#d4d4d4",       // text (dark → light)
          dark: "#ebebec",           // headings and icons, search text (strong contrast)
          secondary: "#6d9c9a",      // titles and links, current graph node
          tertiary: "#f0b32d",       // for when hovering above link
          highlight: "rgba(149, 164, 163, 0.15)", // background for internal links
          textHighlight: "#b3aa0288", // keep or slightly lighten if needed for legibility
        
          nodefirst: "#E06C75",
          nodesecond: "#98c379",
          nodethird: "#c678dd",
          nodevisited: "#61afef",
          border: "rgba(224, 224, 224,0.2)",
          link: "rgba(224, 224, 224,0.25)",

          wikiheading: "#67796b",
          wikibackground: "#42434d",
          wikiborder: "#a3a3a3",

          gradient1: "#00e2ff",
          gradient2: "#f5b0ff",
          italic: "#d4d4d4", /*EAEAEA */
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
      // Plugin.Quoting(),
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
      // Plugin.ImageToolkit(),
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
