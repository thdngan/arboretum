type Tracked = { heading: HTMLElement; links: Element[] }

let tracked: Tracked[] = []
let queued = false

function paint() {
  queued = false
  const windowHeight = window.innerHeight

  const states = tracked.map(({ heading }) => heading.getBoundingClientRect().top < windowHeight)
  tracked.forEach(({ links }, i) => {
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

const MOBILE = "(max-width: 800px)"

let barObserver: ResizeObserver | null = null

function measureTopBar(bar: HTMLElement) {
  if (!window.matchMedia(MOBILE).matches) return
  document.documentElement.style.setProperty(
    "--mobile-bar-height",
    `${Math.round(bar.getBoundingClientRect().height)}px`,
  )
}

function watchTopBar() {
  const bar = document.querySelector<HTMLElement>(".sidebar.left")
  if (!bar) return
  barObserver?.disconnect()
  barObserver = new ResizeObserver(() => measureTopBar(bar))
  barObserver.observe(bar)
  window.addCleanup(() => barObserver?.disconnect())
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
  watchTopBar()

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
