export const REFERENCE_X_HEIGHT = 500

export interface BodyFont {
  id: string
  name: string
  gf?: string
  xHeight: number
  weight?: number
  fallback: string
  noVietnamese?: boolean
  note: string
}

const SERIF_FALLBACK = "Georgia, 'Times New Roman', serif"
const VN_SANS_FALLBACK = "'Be Vietnam Pro', system-ui, sans-serif"

export const BODY_FONTS: BodyFont[] = [
  {
    id: "alegreya",
    name: "Alegreya",
    gf: "Alegreya:ital,wght@0,400;0,500;0,700;1,400;1,500",
    xHeight: 452,
    fallback: SERIF_FALLBACK,
    note: "Drawn for literature, the rhythm is deliberately uneven",
  },
  {
    id: "ibm-plex-serif",
    name: "IBM Plex Serif",
    gf: "IBM+Plex+Serif:ital,wght@0,400;0,600;1,400;1,600",
    xHeight: 516,
    fallback: SERIF_FALLBACK,
    note: "IBM's corporate face",
  },
  {
    id: "piazzolla",
    name: "Piazzolla",
    gf: "Piazzolla:ital,wght@0,400;0,600;1,400;1,600",
    xHeight: 478,
    fallback: SERIF_FALLBACK,
    note: "Built compact for press",
  },
  {
    id: "faustina",
    name: "Faustina",
    gf: "Faustina:ital,wght@0,400;0,600;1,400;1,600",
    xHeight: 494,
    fallback: SERIF_FALLBACK,
    note: "Short ascenders keep the lines close together",
  },
  {
    id: "literata",
    name: "Literata",
    gf: "Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400;1,7..72,600",
    xHeight: 507,
    fallback: SERIF_FALLBACK,
    note: "The Google Play Books reading face",
  },
  {
    id: "andada-pro",
    name: "Andada Pro",
    gf: "Andada+Pro:ital,wght@0,400;0,600;1,400;1,600",
    xHeight: 494,
    fallback: SERIF_FALLBACK,
    note: "Its serifs land between slab and old-style",
  },
  {
    id: "source-serif-4",
    name: "Source Serif 4",
    gf: "Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400;1,8..60,600",
    xHeight: 475,
    fallback: SERIF_FALLBACK,
    note: "Transitional shapes borrowed from Fournier",
  },
  {
    id: "fraunces",
    name: "Fraunces",
    gf: "Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400;1,9..144,600",
    xHeight: 482,
    fallback: SERIF_FALLBACK,
    note: "Softer and wonkier than a text serif",
  },
  {
    id: "vollkorn",
    name: "Vollkorn",
    gf: "Vollkorn:ital,wght@0,400;0,600;1,400;1,600",
    xHeight: 458,
    fallback: SERIF_FALLBACK,
    note: "Dark meaty serifs give the page a heavier feel",
  },
  {
    id: "merriweather",
    name: "Merriweather",
    gf: "Merriweather:ital,wght@0,400;0,700;1,400;1,700",
    xHeight: 556,
    fallback: SERIF_FALLBACK,
    note: "Largest x-height here. Letterforms run narrow.",
  },
  {
    id: "lora",
    name: "Lora",
    gf: "Lora:ital,wght@0,400;0,600;1,400;1,600",
    xHeight: 500,
    fallback: SERIF_FALLBACK,
    note: "Brushed curves against driving serifs",
  },
  {
    id: "noto-serif",
    name: "Noto Serif",
    gf: "Noto+Serif:ital,wght@0,400;0,600;1,400;1,600",
    xHeight: 536,
    fallback: SERIF_FALLBACK,
    note: "Part of Noto",
  },
  {
    id: "spectral",
    name: "Spectral",
    gf: "Spectral:ital,wght@0,400;0,600;1,400;1,600",
    xHeight: 450,
    fallback: SERIF_FALLBACK,
    note: "Production Type drew it for long reading on screens",
  },
  {
    id: "atkinson",
    name: "Atkinson Hyperlegible Next",
    gf: "Atkinson+Hyperlegible+Next:ital,wght@0,400;0,600;1,400;1,600",
    xHeight: 496,
    fallback: VN_SANS_FALLBACK,
    noVietnamese: true,
    note: "A grotesque redrawn for low vision, but no Vietnamese :(",
  },
  {
    id: "inter",
    name: "Inter",
    gf: "Inter:ital,opsz,wght@0,14..32,400;0,14..32,600;1,14..32,400;1,14..32,600",
    xHeight: 546,
    fallback: "system-ui, sans-serif",
    note: "Screen sans with tall x-height",
  },
  {
    id: "arial",
    name: "Arial",
    xHeight: 528,
    fallback: "Helvetica, system-ui, sans-serif",
    note: "Basic system sans",
  },
]

export const DEFAULT_FONT_ID = "alegreya"

export const opticalScale = (f: BodyFont): number =>
  Math.round((REFERENCE_X_HEIGHT / f.xHeight) * 1000) / 1000

export const fontStack = (f: BodyFont): string => `'${f.name}', ${f.fallback}`

export const fontHref = (f: BodyFont): string | null =>
  f.gf ? `https://fonts.googleapis.com/css2?family=${f.gf}&display=fallback` : null

export const PREVIEW_SAMPLE = "Nghiêng ế ệ ữ ộ"

export const previewHref = (): string => {
  const shown = BODY_FONTS.map((f) => f.name + f.note).join("") + PREVIEW_SAMPLE
  const text = [...new Set(shown)].sort().join("")
  return (
    "https://fonts.googleapis.com/css2?" +
    BODY_FONTS.filter((f) => f.gf)
      .map((f) => `family=${f.name.replace(/ /g, "+")}:wght@400`)
      .join("&") +
    `&text=${encodeURIComponent(text)}&display=block`
  )
}

export const TEXT_SCALES = [0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4]
export const DEFAULT_SCALE_INDEX = 8
