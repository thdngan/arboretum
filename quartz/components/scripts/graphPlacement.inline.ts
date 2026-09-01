// Below desktop the right sidebar is a grid row that comes after the whole
// centre column, so the map ends up under the Logbook and its comments. The
// panel can't be re-placed with grid alone (.page-footer is nested inside
// .center, which is a plain block), so the node itself moves.
//
// This runs as a beforeDOMLoaded script purely for ordering: it registers its
// `nav` listener before graph.inline.ts registers its own, so the relocation
// happens before the graph renders and the canvas is sized for where it lands.
const NON_DESKTOP = "(max-width: 1200px)"

function placeGraph() {
  const graph = document.querySelector<HTMLElement>(".graph")
  const sidebar = document.querySelector<HTMLElement>(".sidebar.right")
  const pageFooter = document.querySelector<HTMLElement>(".page-footer")
  if (!graph || !pageFooter) return

  if (window.matchMedia(NON_DESKTOP).matches) {
    if (graph.parentElement === pageFooter) return
    // above the Logbook heading, or last if this page has comments turned off
    const anchor =
      pageFooter.querySelector(":scope > h2") ?? pageFooter.querySelector(":scope > .giscus")
    if (anchor) {
      pageFooter.insertBefore(graph, anchor)
    } else {
      pageFooter.appendChild(graph)
    }
  } else if (sidebar && graph.parentElement !== sidebar) {
    // back to the top of the sidebar, above Backlinks
    sidebar.insertBefore(graph, sidebar.firstChild)
  }
}

document.addEventListener("nav", placeGraph)
window.matchMedia(NON_DESKTOP).addEventListener("change", placeGraph)
