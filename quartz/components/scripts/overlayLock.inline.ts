// Backdrop for the full-screen overlays, and the reason it is JS rather than a
// line of backdrop-filter.
//
// On iOS the browser paints page content into a band the layout viewport does not
// cover: with the toolbar collapsed, window.innerHeight reports 752 while
// screen.height is 874, and the page renders into all 874. A position: fixed
// element is hard-clipped to the 752, so a scrim cannot be stretched over that
// band by any means - not lvh/svh/dvh, which all report the short number, not
// viewport-fit=cover, which Firefox iOS answers with zero insets, and not by
// overhanging the element, which paints nothing. Measured on-device; upstream
// Quartz has the same band.
//
// So nothing covers the band, and instead nothing needs to: blur and dim the
// article itself, and whatever of it paints down there arrives already blurred and
// dimmed, continuous with the rest. The overlay then carries no backdrop of its
// own - it is a transparent box holding the dialog.
//
// The catch is that a filter on an ancestor blurs everything inside it, overlays
// included, and makes that ancestor the containing block for any position: fixed
// descendant. So an overlay is moved out to <body> for as long as it is up, and
// put back where it came from on close. A placeholder comment holds its seat, so
// it lands back in its original spot rather than at the end of its parent.

const BLUR_CLASS = "content-blurred"

type Seat = { node: HTMLElement; placeholder: Comment }

// One lock for the whole page, parked on window.
//
// Every component that imports this module - search, the global graph, the home
// dialogs - is bundled separately, so esbuild emits a private copy of this file
// into each bundle. Module-level state would therefore be three unrelated
// `open` arrays holding three unrelated listener identities, and the refcount
// would only ever be right by accident: search could hold the scroll lock while
// the graph's copy, which runs releaseAllOverlays() on every nav, stripped the
// blur class off <html> and removed its own listeners instead of search's. The
// page then looked completely untouched while wheel and touchmove stayed
// cancelled for the rest of the session - dead trackpad scrolling, with only
// the scrollbar still working, until a full reload.
//
// So the state and the handler identities live on window, where every copy
// finds the same ones.
interface OverlayLock {
  open: Seat[]
  held: boolean
  wheel: (e: Event) => void
  keys: (e: Event) => void
}

const LOCK_KEY = "__quartzOverlayLock" as const

const SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
  "Spacebar",
])

function lock(): OverlayLock {
  const w = window as unknown as Record<string, OverlayLock | undefined>
  const existing = w[LOCK_KEY]
  if (existing) return existing

  const state = { open: [], held: false } as unknown as OverlayLock

  const aimedAtOverlay = (target: EventTarget | null): boolean =>
    target instanceof Node && state.open.some((seat) => seat.node.contains(target))

  // Fail open. If the refcount ever falls out of step with the listeners - a
  // navigation that tears the overlay out of the DOM before anything closed it,
  // an exception between the splice and the release - the worst case has to be
  // a lock that does nothing, not a page that can never be scrolled again.
  state.wheel = (e: Event) => {
    if (state.open.length === 0) return
    if (aimedAtOverlay(e.target)) return
    e.preventDefault()
  }

  state.keys = (e: Event) => {
    if (state.open.length === 0) return
    if (!SCROLL_KEYS.has((e as KeyboardEvent).key)) return
    if (aimedAtOverlay(e.target)) return
    e.preventDefault()
  }

  w[LOCK_KEY] = state
  return state
}

function root(): HTMLElement | null {
  return document.getElementById("quartz-root")
}

// Holding the page still, without `overflow: hidden` on the root.
//
// That used to be the lock, and it cost every sticky element on the page: making
// <html> stop being a scroll container drops the desktop sidebars and the mobile
// top bar out of their stuck positions and back into the flow, so the blurred
// backdrop lurches upward the moment a dialog opens. Refusing the scroll where it
// starts leaves the root exactly as it was.
//
// Anything aimed inside the open overlay still scrolls: the dialogs have their own
// scrolling bodies, the search sheet scrolls its results, and the map is panned by
// dragging it.
function holdPage(on: boolean) {
  const state = lock()
  if (state.held === on) return
  state.held = on
  if (on) {
    // passive: false, or preventDefault is ignored on these two
    window.addEventListener("wheel", state.wheel, { passive: false })
    window.addEventListener("touchmove", state.wheel, { passive: false })
    window.addEventListener("keydown", state.keys)
  } else {
    window.removeEventListener("wheel", state.wheel)
    window.removeEventListener("touchmove", state.wheel)
    window.removeEventListener("keydown", state.keys)
  }
}

export function openOverlay(node: HTMLElement | null | undefined) {
  if (!node) return
  const state = lock()
  if (state.open.some((s) => s.node === node)) return

  // only lift it out if it is actually inside the element about to be blurred
  const placeholder = document.createComment("overlay-seat")
  const r = root()
  if (r && r.contains(node)) {
    node.parentNode?.insertBefore(placeholder, node)
    document.body.appendChild(node)
  }
  state.open.push({ node, placeholder })
  document.documentElement.classList.add(BLUR_CLASS)
  holdPage(true)
}

export function closeOverlay(node: HTMLElement | null | undefined) {
  if (!node) return
  const state = lock()
  const i = state.open.findIndex((s) => s.node === node)
  if (i === -1) return
  const seat = state.open[i]
  state.open.splice(i, 1)

  // refcounted: search can be opened from behind a dialog, and whichever closes
  // second must not lift the blur the other still wants. Released before the
  // node is put back, so a throw while reseating a stale node cannot strand the
  // lock (see the fail-open note above - this is the belt to that's braces)
  if (state.open.length === 0) {
    document.documentElement.classList.remove(BLUR_CLASS)
    holdPage(false)
  }

  // back to its seat if the seat still exists; an SPA navigation may have
  // replaced the page under it, in which case the node is stale and just goes
  if (seat.placeholder.parentNode) {
    seat.placeholder.parentNode.insertBefore(seat.node, seat.placeholder)
    seat.placeholder.remove()
  } else if (seat.node.parentNode === document.body) {
    seat.node.remove()
  }
}

// a navigation with an overlay up would otherwise leave the page blurred, or -
// worse, because it is invisible - leave the scroll lock on. Every component
// that owns an overlay calls this as it sets itself up on `nav`, and because
// the lock is shared, any one of those calls cleans up after all of them.
export function releaseAllOverlays() {
  const state = lock()
  for (const seat of [...state.open]) closeOverlay(seat.node)
  state.open.length = 0
  document.documentElement.classList.remove(BLUR_CLASS)
  holdPage(false)
}
