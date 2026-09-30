const NON_DESKTOP = "(max-width: 1200px)"

function placeSidebar() {
  const sidebar = document.querySelector<HTMLElement>(".sidebar.right")
  const pageFooter = document.querySelector<HTMLElement>(".page-footer")
  const body = document.querySelector<HTMLElement>("#quartz-body")
  if (!sidebar || !pageFooter || !body) return

  if (window.matchMedia(NON_DESKTOP).matches) {
    if (sidebar.parentElement === pageFooter) return
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
