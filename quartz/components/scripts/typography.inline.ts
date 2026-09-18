import {
  BODY_FONTS,
  DEFAULT_FONT_ID,
  DEFAULT_SCALE_INDEX,
  TEXT_SCALES,
  fontHref,
  fontStack,
  opticalScale,
  previewHref,
  type BodyFont,
} from "../../util/bodyFonts"

const FONT_KEY = "bodyFont"
const SCALE_KEY = "textScaleIndex"

// Private windows and blocked site data make these throw rather than return
// null, and a reading preference is never worth taking the page down over.
const read = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
const write = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* preference simply will not persist */
  }
}

const byId = (id: string | null): BodyFont | undefined =>
  BODY_FONTS.find((f) => f.id === id)

const savedFont = (): BodyFont => byId(read(FONT_KEY)) ?? byId(DEFAULT_FONT_ID)!

const savedScaleIndex = (): number => {
  const i = Number.parseInt(read(SCALE_KEY) ?? "", 10)
  return Number.isInteger(i) && i >= 0 && i < TEXT_SCALES.length ? i : DEFAULT_SCALE_INDEX
}

// The default face is already in the critical path via quartz.config.ts, so it
// is never re-requested here; every other face is fetched the first time it is
// chosen and then left in the head. spa-preserve keeps Quartz's router from
// throwing the link away on the next navigation.
const ensureFontLoaded = (font: BodyFont) => {
  if (font.id === DEFAULT_FONT_ID) return
  const href = fontHref(font)
  if (!href) return // system face, nothing to fetch
  const id = `typography-font-${font.id}`
  if (document.getElementById(id)) return
  const link = document.createElement("link")
  link.id = id
  link.rel = "stylesheet"
  link.href = href
  link.setAttribute("spa-preserve", "")
  document.head.appendChild(link)
}

const applyFont = (font: BodyFont) => {
  const root = document.documentElement
  // an inline style on <html> outranks the :root block the theme generates
  root.style.setProperty("--bodyFont", fontStack(font))
  root.style.setProperty("--fontOptical", String(opticalScale(font)))
  if (font.weight) {
    root.style.setProperty("--bodyWeight", String(font.weight))
  } else {
    root.style.removeProperty("--bodyWeight")
  }
  ensureFontLoaded(font)
}

const applyScale = (index: number) => {
  document.documentElement.style.setProperty("--textScale", String(TEXT_SCALES[index]))
}

// Runs before the document is parsed, so the chosen face and size are in place
// for the first paint rather than flashing the configured default first.
applyFont(savedFont())
applyScale(savedScaleIndex())

document.addEventListener("nav", () => {
  // The layout may render this menu more than once — the desktop header and the
  // mobile top bar each carry a copy, only one of them visible at a time — so
  // every copy is wired, not just the first in the document. Taking the first
  // is how the visible desktop button went dead: the hidden mobile copy sits in
  // the left sidebar, which comes earlier in the page than the centre column.
  const controls = Array.from(document.querySelectorAll<HTMLElement>(".typography-control"))
  if (controls.length === 0) return

  const inAll = <T extends Element>(selector: string): T[] =>
    controls.flatMap((c) => Array.from(c.querySelectorAll<T>(selector)))
  const sizeValues = inAll<HTMLElement>("[data-size-value]")
  const stepButtons = inAll<HTMLButtonElement>("[data-size-step]")
  const fontButtons = inAll<HTMLButtonElement>("[data-font]")

  // One reader, one set of preferences. The copies share this and are painted
  // together, so a change made in one already shows in the other if the window
  // crosses the breakpoint and that is the copy that gets opened next.
  let scaleIndex = savedScaleIndex()
  let font = savedFont()
  let previewLoaded = false

  const paintState = () => {
    const percent = `${Math.round(TEXT_SCALES[scaleIndex] * 100)}%`
    for (const v of sizeValues) v.textContent = percent
    for (const b of stepButtons) {
      const dir = Number(b.dataset.sizeStep)
      b.disabled = dir < 0 ? scaleIndex === 0 : scaleIndex === TEXT_SCALES.length - 1
    }
    for (const b of fontButtons) {
      b.setAttribute("aria-pressed", String(b.dataset.font === font.id))
    }
  }

  // Every face in the menu is set in itself, which means the menu needs all of
  // them — but only once it is actually opened, and only at one weight.
  const loadPreviewFaces = () => {
    if (previewLoaded) return
    previewLoaded = true
    if (document.getElementById("typography-previews")) return
    const link = document.createElement("link")
    link.id = "typography-previews"
    link.rel = "stylesheet"
    link.href = previewHref()
    link.setAttribute("spa-preserve", "")
    document.head.appendChild(link)
  }

  const onStep = (e: Event) => {
    const button = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-size-step]")
    if (!button) return
    const next = scaleIndex + Number(button.dataset.sizeStep)
    if (next < 0 || next >= TEXT_SCALES.length) return
    scaleIndex = next
    applyScale(scaleIndex)
    write(SCALE_KEY, String(scaleIndex))
    paintState()
  }

  const onPickFont = (e: Event) => {
    const button = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-font]")
    if (!button) return
    const picked = byId(button.dataset.font ?? null)
    if (!picked) return
    font = picked
    applyFont(font)
    write(FONT_KEY, font.id)
    paintState()
  }

  const onReset = () => {
    font = byId(DEFAULT_FONT_ID)!
    scaleIndex = DEFAULT_SCALE_INDEX
    applyFont(font)
    applyScale(scaleIndex)
    write(FONT_KEY, font.id)
    write(SCALE_KEY, String(scaleIndex))
    paintState()
  }

  // Everything below belongs to one copy: its own button, its own panel, its
  // own idea of what counts as clicking outside.
  for (const control of controls) {
    const toggle = control.querySelector<HTMLButtonElement>(".typography-toggle")
    const panel = control.querySelector<HTMLElement>(".typography-panel")
    if (!toggle || !panel) continue
    const resetButton = panel.querySelector<HTMLButtonElement>("[data-typography-reset]")

    // The panel is absolutely positioned against the button, and by default is
    // centred on it. On a narrow screen that centre would hang off one edge, so
    // once it is open we measure and slide it back inside the viewport. Left as
    // a CSS-only centre it would be correct on desktop and wrong on every phone.
    const positionPanel = () => {
      if (panel.hidden) return
      // clear last run's offset so the measurement starts from a known origin
      panel.style.left = "0px"
      panel.style.transform = "none"
      const viewport = document.documentElement.clientWidth
      const controlLeft = control.getBoundingClientRect().left
      const button = toggle.getBoundingClientRect()
      const width = panel.offsetWidth
      const gutter = 12
      const centred = button.left + button.width / 2 - width / 2
      const clamped = Math.max(gutter, Math.min(centred, viewport - width - gutter))
      panel.style.left = `${clamped - controlLeft}px`
    }

    const setOpen = (open: boolean) => {
      panel.hidden = !open
      toggle.setAttribute("aria-expanded", String(open))
      if (open) {
        loadPreviewFaces()
        positionPanel()
      }
    }

    const onToggle = () => setOpen(panel.hidden)

    const onDocumentClick = (e: MouseEvent) => {
      if (!panel.hidden && !control.contains(e.target as Node)) setOpen(false)
    }

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !panel.hidden) {
        setOpen(false)
        toggle.focus()
      }
    }

    toggle.addEventListener("click", onToggle)
    panel.addEventListener("click", onStep)
    panel.addEventListener("click", onPickFont)
    resetButton?.addEventListener("click", onReset)
    document.addEventListener("click", onDocumentClick)
    document.addEventListener("keydown", onKeydown)
    window.addEventListener("resize", positionPanel)

    window.addCleanup(() => {
      toggle.removeEventListener("click", onToggle)
      panel.removeEventListener("click", onStep)
      panel.removeEventListener("click", onPickFont)
      resetButton?.removeEventListener("click", onReset)
      document.removeEventListener("click", onDocumentClick)
      document.removeEventListener("keydown", onKeydown)
      window.removeEventListener("resize", positionPanel)
    })

    setOpen(false)
  }

  paintState()
})
