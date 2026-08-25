// from https://quartz.eilleeenz.com/Quartz-customization-log#scroll-to-top--random-page
import { FullSlug, getFullSlug, pathToRoot, simplifySlug } from "../../util/path"

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

export async function navigateToRandomPage() {
    const fullSlug = getFullSlug(window)
    const data = await fetchData
    const allPosts = Object.keys(data).map((slug) => simplifySlug(slug as FullSlug))
    // window.location.href = `${pathToRoot(fullSlug)}/${allPosts[getRandomInt(allPosts.length - 1)]}`
    let newSlug = `${pathToRoot(fullSlug)}/${allPosts[getRandomInt(allPosts.length - 1)]}`;

    if (newSlug === fullSlug) {
      // Generate a new random slug until it's different from the starting fullSlug
      do {
        newSlug = `${pathToRoot(fullSlug)}/${allPosts[getRandomInt(allPosts.length - 1)]}`;
      } while (newSlug === fullSlug);
    }
    window.location.href = newSlug;
}

// don't hijack the key while the visitor is typing somewhere
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

// Shift+R jumps to a random page. deliberately not Ctrl/Cmd+R, which the
// browser owns for reloading
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
