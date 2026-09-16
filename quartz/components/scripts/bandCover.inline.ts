// Paints the strip of screen that lies below the layout viewport on mobile.
//
// iOS renders the page into a band the viewport does not cover - with the
// browser toolbar collapsed, window.innerHeight reports ~752 while screen.height
// is ~874, and the page paints into all 874. A position: fixed element is
// hard-clipped to the viewport and can never reach that band, which is why no
// scrim, drawer or panel has ever covered it however it was sized. Safari
// happens to leave the band flat there and Firefox leaves the article showing
// through it sharp, so the two look nothing alike.
//
// But page content reaches the band - that is the entire complaint - and this is
// page content: an absolutely positioned child of <body>, with no fixed or sticky
// ancestor to get it promoted into the clipped layer. Parked at the document
// coordinate where the viewport ends, it covers the band on any browser that has
// one and simply sits off-screen on any that does not.
//
// It is removed on close, so the strip goes when the thing that asked for it goes.

const CLASS = "viewport-band-cover"
let cover: HTMLDivElement | null = null

function place() {
  if (!cover) return
  cover.style.top = `${Math.round(window.scrollY + window.innerHeight)}px`
}

export function showBandCover() {
  // phones only: anywhere else the band does not exist and this would just be a
  // slab parked below the fold, over content the reader can still scroll to
  if (!window.matchMedia("(max-width: 800px)").matches) return
  if (cover) {
    place()
    return
  }

  cover = document.createElement("div")
  cover.className = CLASS
  cover.setAttribute("aria-hidden", "true")
  document.body.appendChild(cover)
  place()

  // the band's height changes as the browser collapses and expands its toolbar,
  // and so does where it starts
  window.addEventListener("resize", place)
  window.addEventListener("scroll", place, { passive: true })
}

export function hideBandCover() {
  if (!cover) return
  window.removeEventListener("resize", place)
  window.removeEventListener("scroll", place)
  cover.remove()
  cover = null
}

// Safari keeps showing the strip after the menu that caused it is gone, and
// reloading or opening and closing the toc drawer clears it - so the DOM is
// already right by then and the region simply has not been redrawn. Nudging the
// scroll would do it, but the page may be mid-jump to a heading when this runs
// and a scrollTo cancels that outright. A hair of opacity on the root forces the
// repaint without going near the scroll position, and 0.999 is not visible.
export function forceBandRepaint() {
  const root = document.documentElement
  root.style.opacity = "0.999"
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.style.opacity = ""
    })
  })
}
