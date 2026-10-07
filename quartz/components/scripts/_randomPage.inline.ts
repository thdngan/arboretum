// from https://quartz.eilleeenz.com/Quartz-customization-log#scroll-to-top--random-page
import { FullSlug, getFullSlug, pathToRoot, simplifySlug } from "../../util/path"

const excludedFolders = ["empty", "tags/empty"]
const excludedTags = ["graph-exclude"]
const hiddenTags = ["writings", "notes"]
const FILTER_KEY = "randomPageFilter"

interface RandomFilter {
  scope: string
  tags: string[]
  match: "any" | "all"
}

const noFilter = (): RandomFilter => ({ scope: "", tags: [], match: "any" })

function isExcluded(slug: string) {
  return excludedFolders.some((folder) => slug === folder || slug.startsWith(`${folder}/`))
}

function loadFilter(): RandomFilter {
  try {
    const saved = JSON.parse(localStorage.getItem(FILTER_KEY) ?? "{}")
    return {
      scope: typeof saved.scope === "string" ? saved.scope : "",
      tags: Array.isArray(saved.tags)
        ? saved.tags.filter((tag: unknown) => typeof tag === "string")
        : [],
      match: saved.match === "all" ? "all" : "any",
    }
  } catch {
    return noFilter()
  }
}

function saveFilter(filter: RandomFilter) {
  try {
    localStorage.setItem(FILTER_KEY, JSON.stringify(filter))
  } catch {}
}

function randomPool(data: ContentIndex, filter: RandomFilter): FullSlug[] {
  return (Object.keys(data) as FullSlug[]).filter((slug) => {
    const tags: string[] = data[slug].tags ?? []
    if (isExcluded(slug) || tags.some((tag) => excludedTags.includes(tag))) return false
    if (filter.scope && (!slug.startsWith(`${filter.scope}/`) || slug.endsWith("/index"))) {
      return false
    }
    if (filter.tags.length === 0) return true
    return filter.match === "all"
      ? filter.tags.every((tag) => tags.includes(tag))
      : filter.tags.some((tag) => tags.includes(tag))
  })
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

export function toggleRandomFilter(open?: boolean) {
  const panel = document.querySelector<HTMLElement>(".random-filter-panel")
  const toggle = document.querySelector<HTMLElement>('[data-action="randomFilter"]')
  if (!panel || !toggle) return
  panel.hidden = !(open ?? panel.hidden)
  toggle.setAttribute("aria-expanded", String(!panel.hidden))
}

export async function navigateToRandomPage() {
    const fullSlug = getFullSlug(window)
    const data = await fetchData
    const current = simplifySlug(fullSlug)
    const allPosts = randomPool(data, loadFilter())
      .map((slug) => simplifySlug(slug as FullSlug))
      .filter((slug) => slug !== current)
    if (allPosts.length === 0) {
      toggleRandomFilter(true)
      return
    }

    window.location.href = `${pathToRoot(fullSlug)}/${allPosts[getRandomInt(allPosts.length)]}`
}

function isTypingContext(el: Element | null) {
  if (!el) return false
  const tag = el.tagName
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    (el as HTMLElement).isContentEditable
  )
}

async function shortcutHandler(e: KeyboardEvent) {
  if (e.key.toLowerCase() !== "r") return
  if (!e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return
  if (isTypingContext(document.activeElement)) return
  e.preventDefault()
  await navigateToRandomPage()
}

let filterSetups = 0

async function setupRandomFilter() {
  const setup = ++filterSetups
  const data = await fetchData
  if (setup !== filterSetups) return

  const panel = document.querySelector<HTMLElement>(".random-filter-panel")
  const toggle = document.querySelector<HTMLElement>('[data-action="randomFilter"]')
  if (!panel || !toggle) return
  const pair = toggle.parentElement!
  const dice = pair.querySelector<HTMLElement>('[data-action="randomPgFloating"]')
  const tagBox = panel.querySelector<HTMLElement>(".random-filter-tags")!
  const count = panel.querySelector<HTMLElement>(".random-filter-count")!
  const reset = panel.querySelector<HTMLButtonElement>("[data-random-reset]")!
  const scopeButtons = [...panel.querySelectorAll<HTMLButtonElement>("[data-random-scope]")]
  const matchButtons = [...panel.querySelectorAll<HTMLButtonElement>("[data-random-match]")]
  const current = getFullSlug(window)

  const tags = [
    ...new Set(randomPool(data, noFilter()).flatMap((slug): string[] => data[slug].tags ?? [])),
  ]
    .filter((tag) => !hiddenTags.includes(tag))
    .sort((a, b) => a.localeCompare(b))
  const tagButtons = tags.map((tag) => {
    const button = document.createElement("button")
    button.type = "button"
    button.dataset.randomTag = tag
    button.textContent = tag
    return button
  })
  tagBox.replaceChildren(...tagButtons)

  const saved = loadFilter()
  let filter: RandomFilter = {
    scope: scopeButtons.some((b) => b.dataset.randomScope === saved.scope) ? saved.scope : "",
    tags: saved.tags.filter((tag) => tags.includes(tag)),
    match: saved.match,
  }
  if (filter.scope !== saved.scope || filter.tags.length !== saved.tags.length) saveFilter(filter)

  const paint = () => {
    for (const b of scopeButtons) {
      b.setAttribute("aria-pressed", String(b.dataset.randomScope === filter.scope))
    }
    for (const b of matchButtons) {
      b.setAttribute("aria-pressed", String(b.dataset.randomMatch === filter.match))
    }
    for (const b of tagButtons) {
      const tag = b.dataset.randomTag!
      const picked = filter.tags.includes(tag)
      const withTag = filter.match === "all" ? [...filter.tags, tag] : [tag]
      b.setAttribute("aria-pressed", String(picked))
      b.disabled = !picked && randomPool(data, { ...filter, tags: withTag }).length === 0
    }

    const pool = randomPool(data, filter)
    if (pool.length === 0) {
      count.textContent = "No pages match"
    } else if (pool.every((slug) => slug === current)) {
      count.textContent = "Only this page matches"
    } else {
      count.textContent = `${pool.length} ${pool.length === 1 ? "page" : "pages"}`
    }

    const picks: string[] = []
    const scope = scopeButtons.find((b) => b.dataset.randomScope === filter.scope)
    if (filter.scope && scope?.textContent) picks.push(scope.textContent)
    if (filter.tags.length > 0) picks.push(filter.tags.join(filter.match === "all" ? " + " : " / "))
    const label = ["Random page", ...picks].join(" · ")

    reset.disabled = picks.length === 0
    toggle.classList.toggle("filtered", picks.length > 0)
    if (dice) {
      dice.title = label
      const tooltip = dice.querySelector(".floating-button-tooltip")
      if (tooltip) tooltip.textContent = label
    }
  }

  const onPick = (e: MouseEvent) => {
    const button = (e.target as HTMLElement).closest<HTMLButtonElement>("button")
    if (!button) return
    const { randomScope, randomMatch, randomTag } = button.dataset
    if (randomScope !== undefined) {
      filter = { ...filter, scope: randomScope }
    } else if (randomMatch !== undefined) {
      filter = { ...filter, match: randomMatch === "all" ? "all" : "any" }
    } else if (randomTag !== undefined) {
      const tags = filter.tags.includes(randomTag)
        ? filter.tags.filter((tag) => tag !== randomTag)
        : [...filter.tags, randomTag]
      filter = { ...filter, tags }
    } else if (button === reset) {
      filter = noFilter()
    } else {
      return
    }
    saveFilter(filter)
    paint()
  }

  const onDocumentClick = (e: MouseEvent) => {
    const target = e.target as Node
    if (!panel.hidden && !panel.contains(target) && !pair.contains(target)) {
      toggleRandomFilter(false)
    }
  }

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && !panel.hidden) {
      toggleRandomFilter(false)
      toggle.focus()
    }
  }

  panel.addEventListener("click", onPick)
  document.addEventListener("click", onDocumentClick)
  document.addEventListener("keydown", onKeydown)
  window.addCleanup(() => {
    panel.removeEventListener("click", onPick)
    document.removeEventListener("click", onDocumentClick)
    document.removeEventListener("keydown", onKeydown)
  })

  paint()
}

document.addEventListener("nav", async (e: unknown) => {
//   const slug = (e as CustomEventMap["nav"]).detail.url
  const button = document.getElementById("random-page-button")
  button?.removeEventListener("click", navigateToRandomPage)
  button?.addEventListener("click", navigateToRandomPage)

  document.removeEventListener("keydown", shortcutHandler)
  document.addEventListener("keydown", shortcutHandler)
  window.addCleanup(() => document.removeEventListener("keydown", shortcutHandler))
})

document.addEventListener("nav", setupRandomFilter)
