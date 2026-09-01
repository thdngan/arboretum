// drives the two landing-page buttons that pop the guide and the
// acknowledgements open, mirroring how the floating map button behaves:
// click outside, hit the close button, or press Esc to dismiss.

const OPEN_CLASS = "active"
const LOCK_CLASS = "home-modal-open"

let openPanel: HTMLElement | null = null
let lastTrigger: HTMLElement | null = null

function focusableIn(panel: HTMLElement): HTMLElement[] {
  return Array.from(
    panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.offsetParent !== null || el === document.activeElement)
}

function closeModal() {
  if (!openPanel) return

  openPanel.classList.remove(OPEN_CLASS)
  document
    .querySelectorAll<HTMLElement>(`[data-home-modal][aria-expanded="true"]`)
    .forEach((btn) => btn.setAttribute("aria-expanded", "false"))
  document.documentElement.classList.remove(LOCK_CLASS)
  openPanel = null

  // send focus back where it came from, otherwise it lands on <body>.
  // deferred because Quartz's search registers its own global Esc handler that
  // calls searchButton.focus() whether or not the search is open, and it would
  // otherwise win the race on the Esc path.
  const trigger = lastTrigger
  lastTrigger = null
  setTimeout(() => trigger?.focus(), 0)
}

function openModal(name: string, trigger: HTMLElement) {
  const panel = document.querySelector<HTMLElement>(`[data-home-modal-panel="${name}"]`)
  if (!panel) return

  // never leave two open at once
  if (openPanel && openPanel !== panel) closeModal()

  lastTrigger = trigger
  openPanel = panel
  panel.classList.add(OPEN_CLASS)
  trigger.setAttribute("aria-expanded", "true")
  document.documentElement.classList.add(LOCK_CLASS)

  // start the panel scrolled to the top even if it was left scrolled last time
  const scroller = panel.querySelector<HTMLElement>(".home-modal-panel")
  if (scroller) scroller.scrollTop = 0

  panel.querySelector<HTMLElement>(".home-modal-close")?.focus()
}

function setupHomeModals() {
  // a nav away leaves the lock class behind otherwise
  document.documentElement.classList.remove(LOCK_CLASS)
  openPanel = null
  lastTrigger = null

  // triggers are delegated from the document: a page can carry several rows of
  // keys (a sidebar copy and an in-flow copy), all driving the one set of panels
  const onTriggerClick = (e: Event) => {
    const trigger = (e.target as Element).closest<HTMLElement>("[data-home-modal]")
    if (!trigger) return
    e.preventDefault()
    const name = trigger.getAttribute("data-home-modal")!
    const alreadyOpen =
      openPanel !== null && openPanel.getAttribute("data-home-modal-panel") === name
    if (alreadyOpen) {
      closeModal()
    } else {
      openModal(name, trigger)
    }
  }

  document.addEventListener("click", onTriggerClick)
  window.addCleanup(() => document.removeEventListener("click", onTriggerClick))

  document.querySelectorAll<HTMLElement>(".home-modal").forEach((panel) => {
    // clicking the backdrop (but not the panel itself) dismisses
    const onBackdropClick = (e: MouseEvent) => {
      if (e.target === panel) closeModal()
    }
    panel.addEventListener("click", onBackdropClick)
    window.addCleanup(() => panel.removeEventListener("click", onBackdropClick))

    const closeButton = panel.querySelector<HTMLElement>(".home-modal-close")
    const onCloseClick = () => closeModal()
    closeButton?.addEventListener("click", onCloseClick)
    if (closeButton) {
      window.addCleanup(() => closeButton.removeEventListener("click", onCloseClick))
    }
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if (!openPanel) return

    if (e.key === "Escape") {
      e.preventDefault()
      closeModal()
      return
    }

    // keep tabbing inside the open dialog
    if (e.key === "Tab") {
      const items = focusableIn(openPanel)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (e.shiftKey && (active === first || !openPanel.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  document.addEventListener("keydown", onKeyDown)
  window.addCleanup(() => document.removeEventListener("keydown", onKeyDown))
}

document.addEventListener("nav", setupHomeModals)
