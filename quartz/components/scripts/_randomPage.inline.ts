// from https://quartz.eilleeenz.com/Quartz-customization-log#scroll-to-top--random-page
import { FullSlug, getFullSlug, pathToRoot, simplifySlug } from "../../util/path"

const excludedFolders = ["empty", "tags/empty"]

function isExcluded(slug: string) {
  return excludedFolders.some((folder) => slug === folder || slug.startsWith(`${folder}/`))
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

export async function navigateToRandomPage() {
    const fullSlug = getFullSlug(window)
    const data = await fetchData
    const current = simplifySlug(fullSlug)
    const allPosts = Object.keys(data)
      .filter((slug) => !isExcluded(slug))
      .map((slug) => simplifySlug(slug as FullSlug))
      .filter((slug) => slug !== current)
    if (allPosts.length === 0) return

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

document.addEventListener("nav", async (e: unknown) => {
//   const slug = (e as CustomEventMap["nav"]).detail.url
  const button = document.getElementById("random-page-button")
  button?.removeEventListener("click", navigateToRandomPage)
  button?.addEventListener("click", navigateToRandomPage)

  document.removeEventListener("keydown", shortcutHandler)
  document.addEventListener("keydown", shortcutHandler)
  window.addCleanup(() => document.removeEventListener("keydown", shortcutHandler))
})
