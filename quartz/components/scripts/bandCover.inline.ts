const CLASS = "viewport-band-cover"
let cover: HTMLDivElement | null = null

function place() {
  if (!cover) return
  cover.style.top = `${Math.round(window.scrollY + window.innerHeight)}px`
}

export function showBandCover() {
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

export function forceBandRepaint() {
  const root = document.documentElement
  root.style.opacity = "0.999"
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.style.opacity = ""
    })
  })
}
