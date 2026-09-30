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
  } catch {}
}

const byId = (id: string | null): BodyFont | undefined =>
  BODY_FONTS.find((f) => f.id === id)

const savedFont = (): BodyFont => byId(read(FONT_KEY)) ?? byId(DEFAULT_FONT_ID)!

const savedScaleIndex = (): number => {
  const i = Number.parseInt(read(SCALE_KEY) ?? "", 10)
  return Number.isInteger(i) && i >= 0 && i < TEXT_SCALES.length ? i : DEFAULT_SCALE_INDEX
}

const ensureFontLoaded = (font: BodyFont) => {
  if (font.id === DEFAULT_FONT_ID) return
  const href = fontHref(font)
  if (!href) return
  const id = `typography-font-${font.id}`
  if (document.getElementById(id)) return
  const link = document.createElement("link")
  link.id = id
  link.rel = "stylesheet"
  link.href = href
  link.setAttribute("spa-preserve", "")
  if (document.readyState === "loading") link.setAttribute("blocking", "render")
  document.head.appendChild(link)
}

const applyFont = (font: BodyFont) => {
  const root = document.documentElement
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

applyFont(savedFont())
applyScale(savedScaleIndex())

document.addEventListener("nav", () => {
  const controls = Array.from(document.querySelectorAll<HTMLElement>(".typography-control"))
  if (controls.length === 0) return

  const inAll = <T extends Element>(selector: string): T[] =>
    controls.flatMap((c) => Array.from(c.querySelectorAll<T>(selector)))
  const sizeValues = inAll<HTMLElement>("[data-size-value]")
  const stepButtons = inAll<HTMLButtonElement>("[data-size-step]")
  const fontButtons = inAll<HTMLButtonElement>("[data-font]")

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

  const loadPreviewFaces = () => {
    if (previewLoaded) return
    previewLoaded = true
    if (document.getElementById("typography-previews")) return
    const link = document.createElement("link")
    link.id = "typography-previews"
    link.rel = "stylesheet"
    link.href = previewHref()
    link.setAttribute("spa-preserve", "")
    link.addEventListener("load", () => {
      for (const f of BODY_FONTS) {
        if (f.gf) document.fonts.load(`400 1em '${f.name}'`).catch(() => {})
      }
    })
    document.head.appendChild(link)
  }
  const whenIdle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1500))
  whenIdle(loadPreviewFaces)

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

  for (const control of controls) {
    const toggle = control.querySelector<HTMLButtonElement>(".typography-toggle")
    const panel = control.querySelector<HTMLElement>(".typography-panel")
    if (!toggle || !panel) continue
    const resetButton = panel.querySelector<HTMLButtonElement>("[data-typography-reset]")

    const positionPanel = () => {
      if (panel.hidden) return
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
