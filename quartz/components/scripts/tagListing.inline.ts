// Folds the per-tag sections on the all-tags page (/tags). Which tags are
// folded is remembered across visits, the way the Explorer remembers its
// folders; storage can be unavailable, in which case every section starts open.
const STORAGE_KEY = "collapsedTags"

function loadCollapsed(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"))
  } catch {
    return new Set()
  }
}

function saveCollapsed(collapsed: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...collapsed]))
  } catch {}
}

function setCollapsed(section: HTMLElement, collapsed: boolean) {
  section.classList.toggle("collapsed", collapsed)
  section.querySelector(".tag-fold")?.setAttribute("aria-expanded", String(!collapsed))
}

document.addEventListener("nav", () => {
  const sections = document.querySelectorAll<HTMLElement>(".tag-section[data-tag]")
  if (sections.length === 0) return

  const collapsed = loadCollapsed()
  for (const section of sections) {
    const tag = section.dataset.tag!
    setCollapsed(section, collapsed.has(tag))

    const button = section.querySelector<HTMLButtonElement>(".tag-fold")
    if (!button) continue
    const toggle = () => {
      const nowCollapsed = !section.classList.contains("collapsed")
      setCollapsed(section, nowCollapsed)
      if (nowCollapsed) collapsed.add(tag)
      else collapsed.delete(tag)
      saveCollapsed(collapsed)
    }
    button.addEventListener("click", toggle)
    window.addCleanup(() => button.removeEventListener("click", toggle))
  }
})
