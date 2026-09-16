// Shades each toc entry by whether its heading has been passed yet.
//
// This used to be an IntersectionObserver, which is what made jumping break it.
// An observer only reports elements whose intersection *changes*, and a heading
// that starts below the viewport and lands above it - which is exactly what
// clicking a toc entry or the scroll-to-top/bottom buttons does to every heading
// in between - was never intersecting at either end. Its state stayed false, no
// callback fired, and its entry kept whatever shading it had before the jump.
// Hence a list that is right while you scroll and goes piebald the moment you
// jump, then half-repairs itself as manual scrolling drags individual headings
// back across the boundary.
//
// Reading the positions directly has no such gap: every scroll recomputes every
// entry, so the list cannot hold a stale one. The reads are batched into one
// animation frame and the writes come after them, and the entry links are looked
// up once per navigation rather than once per callback.

type Tracked = { heading: HTMLElement; links: Element[] }

let tracked: Tracked[] = []
let queued = false

function paint() {
  queued = false
  const windowHeight = window.innerHeight

  // read first, write second: interleaving them would force a reflow per heading
  const states = tracked.map(({ heading }) => heading.getBoundingClientRect().top < windowHeight)
  tracked.forEach(({ links }, i) => {
    // a page carries each entry twice at narrow widths, once in the sidebar list
    // and once in the mobile drawer (TableOfContents.tsx); both shade together
    for (const link of links) link.classList.toggle("in-view", states[i])
  })
}

function onScroll() {
  if (queued) return
  queued = true
  requestAnimationFrame(paint)
}

function toggleToc(this: HTMLElement) {
  this.classList.toggle("collapsed")
  this.setAttribute(
    "aria-expanded",
    this.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )
  const content = this.nextElementSibling as HTMLElement | undefined
  if (!content) return
  content.classList.toggle("collapsed")
}

function setupToc() {
  const toc = document.getElementById("toc")
  if (toc) {
    const content = toc.nextElementSibling as HTMLElement | undefined
    if (!content) return
    toc.addEventListener("click", toggleToc)
    window.addCleanup(() => toc.removeEventListener("click", toggleToc))
  }
}

window.addEventListener("resize", setupToc)
document.addEventListener("nav", () => {
  setupToc()

  tracked = [
    ...document.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]"),
  ]
    .map((heading) => ({
      heading,
      links: [...document.querySelectorAll(`a[data-for="${CSS.escape(heading.id)}"]`)],
    }))
    .filter(({ links }) => links.length > 0)

  paint()
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll)
  window.addCleanup(() => {
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("resize", onScroll)
  })
})
