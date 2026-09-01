// Below desktop the right sidebar is a grid row that comes after the whole
// centre column, so the map and backlinks end up under the Logbook and its
// comments. The panel can't be re-placed with grid alone (.page-footer is
// nested inside .center, which is a plain block), so the node itself moves.
//
// The whole sidebar moves, not just the graph: below desktop .sidebar.right is
// already `flex-direction: row` with `& > * { flex: 1 }`, so relocating it puts
// the map and the backlinks side by side for free.
//
// This runs as a beforeDOMLoaded script purely for ordering: it registers its
// `nav` listener before graph.inline.ts registers its own, so the relocation
// happens before the graph renders and the canvas is sized for where it lands.
const NON_DESKTOP = "(max-width: 1200px)"

function placeSidebar() {
  const sidebar = document.querySelector<HTMLElement>(".sidebar.right")
  const pageFooter = document.querySelector<HTMLElement>(".page-footer")
  const body = document.querySelector<HTMLElement>("#quartz-body")
  if (!sidebar || !pageFooter || !body) return

  if (window.matchMedia(NON_DESKTOP).matches) {
    if (sidebar.parentElement === pageFooter) return
    // above the Logbook's own dinkus specifically - the home page has further
    // dinkuses earlier in the footer, and the sidebar belongs after those
    const anchor =
      pageFooter.querySelector(":scope > .dinkus--logbook") ??
      pageFooter.querySelector(":scope > h2") ??
      pageFooter.querySelector(":scope > .giscus")
    if (anchor) {
      pageFooter.insertBefore(sidebar, anchor)
    } else {
      pageFooter.appendChild(sidebar)
    }
  } else {
    if (sidebar.parentElement === body) return
    // back to its grid cell, between the centre column and the site footer
    const footer = body.querySelector(":scope > footer")
    if (footer) {
      body.insertBefore(sidebar, footer)
    } else {
      body.appendChild(sidebar)
    }
  }
}

document.addEventListener("nav", placeSidebar)
window.matchMedia(NON_DESKTOP).addEventListener("change", placeSidebar)
