export interface ColorScheme {
  light: string
  lightgray: string
  gray: string
  darkgray: string
  dark: string
  secondary: string
  tertiary: string
  highlight: string
  nodefirst: string
  nodesecond: string
  nodethird: string
  wikiheading: string
  wikibackground: string
  wikiborder: string
  gradient1:string
  gradient2:string
  italic:string
  link:string
  border:string
}

interface Colors {
  lightMode: ColorScheme
  darkMode: ColorScheme
}

export interface Theme {
  typography: {
    header: string
    body: string
    code: string
  }
  cdnCaching: boolean
  colors: Colors
  fontOrigin: "googleFonts" | "local"
}

export type ThemeKey = keyof Colors

const DEFAULT_SANS_SERIF =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
const DEFAULT_MONO = "ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace"

export function googleFontHref(theme: Theme) {
  const { code, header, body } = theme.typography
  return `https://fonts.googleapis.com/css2?family=${code}&family=${header}:wght@400;700&family=${body}:ital,wght@0,400;0,600;1,400;1,600&display=swap`
}

export function joinStyles(theme: Theme, ...stylesheet: string[]) {
  return `
${stylesheet.join("\n\n")}

:root {
  --light: ${theme.colors.lightMode.light};
  --lightgray: ${theme.colors.lightMode.lightgray};
  --gray: ${theme.colors.lightMode.gray};
  --darkgray: ${theme.colors.lightMode.darkgray};
  --dark: ${theme.colors.lightMode.dark};
  --secondary: ${theme.colors.lightMode.secondary};
  --tertiary: ${theme.colors.lightMode.tertiary};
  --highlight: ${theme.colors.lightMode.highlight};
  --nodefirst: ${theme.colors.lightMode.nodefirst};
  --nodesecond: ${theme.colors.lightMode.nodesecond};
  --nodethird: ${theme.colors.lightMode.nodethird};
  --wikiheading: ${theme.colors.lightMode.wikiheading};
  --wikibackground: ${theme.colors.lightMode.wikibackground};
  --wikiborder: ${theme.colors.lightMode.wikiborder};
  --gradient1: ${theme.colors.lightMode.gradient1};
  --gradient2: ${theme.colors.lightMode.gradient2};
  --italic: ${theme.colors.lightMode.italic};
  --link: ${theme.colors.lightMode.link};
  --border: ${theme.colors.lightMode.border};

  --headerFont: "${theme.typography.header}", ${DEFAULT_SANS_SERIF};
  --bodyFont: "${theme.typography.body}", ${DEFAULT_SANS_SERIF};
  --codeFont: "${theme.typography.code}", ${DEFAULT_MONO};
}

:root[saved-theme="dark"] {
  --light: ${theme.colors.darkMode.light};
  --lightgray: ${theme.colors.darkMode.lightgray};
  --gray: ${theme.colors.darkMode.gray};
  --darkgray: ${theme.colors.darkMode.darkgray};
  --dark: ${theme.colors.darkMode.dark};
  --secondary: ${theme.colors.darkMode.secondary};
  --tertiary: ${theme.colors.darkMode.tertiary};
  --highlight: ${theme.colors.darkMode.highlight};
  --nodefirst: ${theme.colors.darkMode.nodefirst};
  --nodesecond: ${theme.colors.darkMode.nodesecond};
  --nodethird: ${theme.colors.darkMode.nodethird};
  --wikiheading: ${theme.colors.darkMode.wikiheading};
  --wikibackground: ${theme.colors.darkMode.wikibackground};
  --wikiborder: ${theme.colors.darkMode.wikiborder};
  --gradient1: ${theme.colors.darkMode.gradient1};
  --gradient2: ${theme.colors.darkMode.gradient2};
  --italic: ${theme.colors.darkMode.italic};
  --link: ${theme.colors.darkMode.link};
  --border: ${theme.colors.darkMode.border};
}
`
}
