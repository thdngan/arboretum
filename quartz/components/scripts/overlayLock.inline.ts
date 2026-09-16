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

let open: Seat[] = []

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

function aimedAtOverlay(target: EventTarget | null): boolean {
  return target instanceof Node && open.some((seat) => seat.node.contains(target))
}

function blockScroll(e: Event) {
  if (aimedAtOverlay(e.target)) return
  e.preventDefault()
}

function blockScrollKeys(e: KeyboardEvent) {
  if (!SCROLL_KEYS.has(e.key)) return
  if (aimedAtOverlay(e.target)) return
  e.preventDefault()
}

function holdPage(on: boolean) {
  const fn = on ? window.addEventListener : window.removeEventListener
  // passive: false, or preventDefault is ignored on these two
  fn("wheel", blockScroll, { passive: false } as AddEventListenerOptions)
  fn("touchmove", blockScroll, { passive: false } as AddEventListenerOptions)
  fn("keydown", blockScrollKeys as EventListener)
}

export function openOverlay(node: HTMLElement | null | undefined) {
  if (!node) return
  if (open.some((s) => s.node === node)) return

  // only lift it out if it is actually inside the element about to be blurred
  const placeholder = document.createComment("overlay-seat")
  const r = root()
  if (r && r.contains(node)) {
    node.parentNode?.insertBefore(placeholder, node)
    document.body.appendChild(node)
  }
  const first = open.length === 0
  open.push({ node, placeholder })
  document.documentElement.classList.add(BLUR_CLASS)
  if (first) holdPage(true)
}

export function closeOverlay(node: HTMLElement | null | undefined) {
  if (!node) return
  const i = open.findIndex((s) => s.node === node)
  if (i === -1) return
  const seat = open[i]
  open.splice(i, 1)

  // back to its seat if the seat still exists; an SPA navigation may have
  // replaced the page under it, in which case the node is stale and just goes
  if (seat.placeholder.parentNode) {
    seat.placeholder.parentNode.insertBefore(seat.node, seat.placeholder)
    seat.placeholder.remove()
  } else if (seat.node.parentNode === document.body) {
    seat.node.remove()
  }

  // refcounted: search can be opened from behind a dialog, and whichever closes
  // second must not lift the blur the other still wants
  if (open.length === 0) {
    document.documentElement.classList.remove(BLUR_CLASS)
    holdPage(false)
  }
}

// a navigation with an overlay up would otherwise leave the page blurred
export function releaseAllOverlays() {
  for (const seat of [...open]) closeOverlay(seat.node)
  open = []
  document.documentElement.classList.remove(BLUR_CLASS)
  holdPage(false)
}
