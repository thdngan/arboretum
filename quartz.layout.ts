import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/thdngan",
      Email: "mailto:trinhhoangdieungan@gmail.com",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recent Posts",
        limit: 2,
        filter: (f) =>
          f.slug!.startsWith("posts/") && f.slug! !== "posts/index" && !f.frontmatter?.noindex,
        linkToMore: "posts/" as SimpleSlug,
      }),
    ),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recent Notes",
        limit: 2,
        filter: (f) =>
          f.slug!.startsWith("notes/") && f.slug! !== "notes/index" && !f.frontmatter?.noindex,
        linkToMore: "notes/" as SimpleSlug,
      }),
    ),
    ],
  right: [Component.Graph(), Component.DesktopOnly(
    Component.RecentNotes({
      title: "Topics",
      limit: 3,
      filter: (f) =>
        f.slug!.startsWith("subjects/") && f.slug! !== "subjects/index" && !f.frontmatter?.noindex,
      linkToMore: "subjects/" as SimpleSlug,
    }),
  ),Component.Backlinks()],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
