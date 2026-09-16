// Pins the page under a full-screen overlay, and - the reason this exists rather
// than a line of `overflow: hidden` - makes the overlay's scrim reach the whole
// screen on iOS.
//
// On iOS the browser paints page content into a band the layout viewport does not
// cover: with the toolbar collapsed to its pill, window.innerHeight reports 752
// while screen.height is 874, and the page renders into all 874. A position:
// fixed element is hard-clipped to the 752, so no scrim can be stretched over the
// band however it is sized - not with lvh/svh/dvh (all of which report the short
// number), not with viewport-fit=cover (Firefox iOS reports every safe-area inset
// as 0), and not by overhanging the element past the viewport, which paints
// nothing. Measured on an iPhone over USB; upstream Quartz has the same band.
//
// The one surface that does reach the band is the page canvas. So: put the
// document itself into a fixed layer, which clips it to the viewport the same way
// and stops it painting down there, and colour the canvas to match the scrim.
// The band then reads as a continuation of the scrim rather than a strip of sharp
// article. .overlay-locked in base.scss is that colour.
//
// The cost is a real scroll lock - a fixed body has no scroll offset of its own -
// so the offset is carried on `top` and put back on release.

const LOCK_CLASS = "overlay-locked"

let depth = 0
let savedY = 0

export function lockPage() {
  // refcounted: search can be opened from behind a dialog, and whichever closes
  // second must not release a lock the other still wants
  if (depth++ > 0) return

  savedY = window.scrollY
  const body = document.body
  body.style.position = "fixed"
  body.style.top = `${-savedY}px`
  body.style.left = "0"
  body.style.right = "0"
  body.style.width = "100%"
  document.documentElement.classList.add(LOCK_CLASS)
}

export function unlockPage() {
  if (depth === 0) return
  if (--depth > 0) return

  const body = document.body
  body.style.position = ""
  body.style.top = ""
  body.style.left = ""
  body.style.right = ""
  body.style.width = ""
  document.documentElement.classList.remove(LOCK_CLASS)
  // instant, not smooth: the page never appeared to move, so it must not appear
  // to move back either
  window.scrollTo({ top: savedY, behavior: "instant" as ScrollBehavior })
}

// an SPA navigation with a dialog open would otherwise leave the body pinned
export function releaseAllLocks() {
  depth = depth > 0 ? 1 : 0
  unlockPage()
}
