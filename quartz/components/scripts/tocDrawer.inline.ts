// Drives the mobile table of contents (see TocDrawer in TableOfContents.tsx):
// a panel parked off the right edge that a drag pulls in, and a drag pushes
// back out again.
//
// The read/unread shading inside it is not set here, the IntersectionObserver
// in toc.inline.ts marks every `a[data-for]` on the page, this panel's copies
// included, so the list here shades exactly like the sidebar one on desktop.

// (the inline scripts have no imports, so tsc reads them as one shared global
// scope, hence the DRAWER_ prefixes, which keep the class-name constants from
// colliding with the identically-named ones in homeModals.inline.ts)

// how close to the right edge a touch has to start to count as reaching for the
// drawer rather than for the page
const EDGE_ZONE = 28
// travel before the gesture commits to an axis. Too small and a scroll that
// drifts sideways grabs the panel; too large and the panel lags the finger.
const AXIS_SLOP = 10
// px/ms past which a flick settles the drawer in the direction it was thrown,
// however far it actually got
const FLICK_SPEED = 0.4
const DRAWER_OPEN_CLASS = "is-open"
const DRAWER_DRAG_CLASS = "is-dragging"
const DRAWER_LOCK_CLASS = "toc-drawer-open"

let drawer: HTMLElement | null = null
let panel: HTMLElement | null = null
let scrim: HTMLElement | null = null
let tab: HTMLElement | null = null

let isOpen = false
let panelWidth = 0

// live gesture
let tracking = false
let axis: "unknown" | "x" | "y" = "unknown"
let startX = 0
let startY = 0
let baseOffset = 0
let offset = 0
let lastX = 0
let lastTime = 0
let speed = 0

function setOffset(px: number) {
  if (!drawer || panelWidth === 0) return
  offset = Math.min(panelWidth, Math.max(0, px))
  // inline on the wrapper, so it beats the resting values .is-open sets
  drawer.style.setProperty("--toc-drawer-offset", `${offset}px`)
  drawer.style.setProperty("--toc-drawer-progress", `${1 - offset / panelWidth}`)
}

function clearOffset() {
  drawer?.style.removeProperty("--toc-drawer-offset")
  drawer?.style.removeProperty("--toc-drawer-progress")
}

// the point of opening the contents mid-article is to see where you are, so
// bring the last read entry to the middle of the panel rather than making the
// reader hunt for it
function revealCurrentEntry() {
  const list = panel?.querySelector<HTMLElement>(".toc-drawer-list")
  if (!list) return

  const read = list.querySelectorAll<HTMLElement>("a.in-view")
  const current = read[read.length - 1]
  if (!current) {
    list.scrollTop = 0
    return
  }

  list.scrollTop = current.offsetTop - list.clientHeight / 2 + current.offsetHeight / 2
}

// `moveFocus` only when the tab was activated: it is holding focus, and it goes
// opacity:0 the moment the panel is out, so leaving focus there strands a
// keyboard user on an invisible control. A swipe never focused anything, and
// pulling focus into the panel would paint a focus ring nobody asked for.
function openDrawer(moveFocus = false) {
  if (!drawer || isOpen) return
  isOpen = true
  drawer.classList.add(DRAWER_OPEN_CLASS)
  tab?.setAttribute("aria-expanded", "true")
  document.documentElement.classList.add(DRAWER_LOCK_CLASS)
  revealCurrentEntry()

  if (moveFocus) {
    panel?.querySelector<HTMLElement>(".toc-drawer-close")?.focus({ preventScroll: true })
  }
}

function closeDrawer() {
  if (!drawer || !isOpen) return
  isOpen = false
  drawer.classList.remove(DRAWER_OPEN_CLASS)
  tab?.setAttribute("aria-expanded", "false")
  document.documentElement.classList.remove(DRAWER_LOCK_CLASS)

  // focus would otherwise be stranded on an element that is about to go
  // visibility:hidden, which drops it on <body>
  if (panel?.contains(document.activeElement)) {
    tab?.focus()
  }
}

// below the sidebar breakpoint the wrapper is display:contents, above it
// display:none : reading that keeps the breakpoint itself in the stylesheet
function isActive() {
  return drawer !== null && getComputedStyle(drawer).display !== "none"
}

function measurePanel() {
  // visibility:hidden still lays out, so the closed panel measures correctly
  panelWidth = panel?.getBoundingClientRect().width ?? 0
}

function onTouchStart(e: TouchEvent) {
  if (!drawer || !panel || e.touches.length !== 1 || !isActive()) return

  const touch = e.touches[0]
  if (isOpen) {
    // once it is out, only a drag that starts on the drawer itself moves it
    const target = e.target as Node
    if (!panel.contains(target) && target !== scrim) return
  } else if (touch.clientX < window.innerWidth - EDGE_ZONE) {
    return
  }

  measurePanel()
  if (panelWidth === 0) return

  tracking = true
  axis = "unknown"
  startX = lastX = touch.clientX
  startY = touch.clientY
  baseOffset = isOpen ? 0 : panelWidth
  offset = baseOffset
  lastTime = e.timeStamp
  speed = 0
}

function onTouchMove(e: TouchEvent) {
  if (!tracking || !drawer) return

  const touch = e.touches[0]
  const dx = touch.clientX - startX
  const dy = touch.clientY - startY

  if (axis === "unknown") {
    if (Math.abs(dx) < AXIS_SLOP && Math.abs(dy) < AXIS_SLOP) return

    axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y"
    if (axis === "y") {
      // a mostly-vertical drag belongs to the page, or to the list's own
      // scrolling: drop the gesture rather than fight for it
      tracking = false
      return
    }
    drawer.classList.add(DRAWER_DRAG_CLASS)
    // the panel becomes visible from here on, so put the list where it belongs
    // now rather than after the finger lifts
    if (!isOpen) revealCurrentEntry()
  }

  // without this the page scrolls under the drag, and on iOS the browser's own
  // right-edge swipe (forward in history) races us for the same gesture
  if (e.cancelable) e.preventDefault()

  const dt = e.timeStamp - lastTime
  if (dt > 0) speed = (touch.clientX - lastX) / dt
  lastX = touch.clientX
  lastTime = e.timeStamp

  setOffset(baseOffset + dx)
}

function onTouchEnd() {
  if (!tracking || !drawer) return
  tracking = false
  if (axis !== "x") return
  axis = "unknown"

  // a flick is a statement of intent; only a slow drag is judged on distance
  const shouldOpen =
    Math.abs(speed) > FLICK_SPEED ? speed < 0 : offset < panelWidth / 2

  // dropping the class and the inline offset together lets the transition pick
  // up from wherever the finger left the panel
  drawer.classList.remove(DRAWER_DRAG_CLASS)
  clearOffset()

  if (shouldOpen) {
    openDrawer()
  } else {
    closeDrawer()
  }
}

function focusableInDrawer(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  )
}

function onKeyDown(e: KeyboardEvent) {
  if (!isOpen || !panel) return

  if (e.key === "Escape") {
    e.preventDefault()
    closeDrawer()
    return
  }

  if (e.key === "Tab") {
    const items = focusableInDrawer(panel)
    if (items.length === 0) return
    const first = items[0]
    const last = items[items.length - 1]
    const active = document.activeElement as HTMLElement | null

    if (e.shiftKey && (active === first || !panel.contains(active))) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

function setupTocDrawer() {
  // a nav away mid-swipe would otherwise leave the scroll lock behind
  document.documentElement.classList.remove(DRAWER_LOCK_CLASS)
  isOpen = false
  tracking = false
  axis = "unknown"

  drawer = document.querySelector<HTMLElement>(".toc-drawer")
  panel = drawer?.querySelector<HTMLElement>(".toc-drawer-panel") ?? null
  scrim = drawer?.querySelector<HTMLElement>(".toc-drawer-scrim") ?? null
  tab = drawer?.querySelector<HTMLElement>(".toc-drawer-tab") ?? null
  if (!drawer || !panel) return

  drawer.classList.remove(DRAWER_OPEN_CLASS, DRAWER_DRAG_CLASS)
  clearOffset()

  const onTabClick = () => (isOpen ? closeDrawer() : openDrawer(true))
  tab?.addEventListener("click", onTabClick)
  if (tab) window.addCleanup(() => tab?.removeEventListener("click", onTabClick))

  const onScrimClick = () => closeDrawer()
  scrim?.addEventListener("click", onScrimClick)
  if (scrim) window.addCleanup(() => scrim?.removeEventListener("click", onScrimClick))

  // the close button and every entry in the list dismiss it: tapping a heading
  // means "take me there", and the panel is in the way of there
  const onPanelClick = (e: MouseEvent) => {
    const target = e.target as Element
    if (target.closest(".toc-drawer-close") || target.closest("a[data-for]")) {
      closeDrawer()
    }
  }
  panel.addEventListener("click", onPanelClick)
  window.addCleanup(() => panel?.removeEventListener("click", onPanelClick))

  document.addEventListener("keydown", onKeyDown)
  window.addCleanup(() => document.removeEventListener("keydown", onKeyDown))

  // on the document rather than on the drawer: the gesture that opens it starts
  // on the article, which is nowhere near this element
  document.addEventListener("touchstart", onTouchStart, { passive: true })
  document.addEventListener("touchmove", onTouchMove, { passive: false })
  document.addEventListener("touchend", onTouchEnd)
  document.addEventListener("touchcancel", onTouchEnd)
  window.addCleanup(() => {
    document.removeEventListener("touchstart", onTouchStart)
    document.removeEventListener("touchmove", onTouchMove)
    document.removeEventListener("touchend", onTouchEnd)
    document.removeEventListener("touchcancel", onTouchEnd)
  })

  // rotating the phone changes the panel's width, and a stale one would settle
  // the next drag against the wrong halfway point
  const onResize = () => {
    if (isActive()) measurePanel()
  }
  window.addEventListener("resize", onResize)
  window.addCleanup(() => window.removeEventListener("resize", onResize))
}

document.addEventListener("nav", setupTocDrawer)
