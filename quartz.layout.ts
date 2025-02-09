import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: "thdngan/arboretum",
        // from data-repo-id
        repoId: "R_kgDOHxknJg",
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: "DIC_kwDOHxknJs4CfhAs",
        themeUrl: "https://thdngan.github.io/arboretum/static/giscus", // corresponds to quartz/static/giscus/
        lightTheme: "light", // corresponds to light-theme.css in quartz/static/giscus/
        darkTheme: "dark", // corresponds to dark-theme.css quartz/static/giscus/
        mapping: "pathname",
        strict: "0",
        inputPosition: "top",
      }
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/thdngan",
      Email: "mailto:trinhhoangdieungan@gmail.com",
    },
    // config.plugins.transformers.find((e) => {e.name === "Remark42"})?.options
  }),
  
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.MobileOnly(Component.TagList()),
    // Component.Comments(),
    // Component.MobileOnly(Component.TableOfContents()),
    
  ],
  left: [
    // Component.DesktopOnly(Component.PageTitle()),
    // Component.MobileOnly(Component.PageTitleMobile()),
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    
    Component.DesktopOnly(Component.TableOfContents()),
    // Component.TableOfContents(),
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
  Component.FloatingButtons({position: 'right'}),

    // Component.DesktopOnly(Component.Explorer())
    ],
  right: [
    Component.Graph(),
  //   Component.DesktopOnly(
  //   Component.RecentNotes({
  //     title: "Topics",
  //     limit: 3,
  //     filter: (f) =>
  //       f.slug!.startsWith("subjects/") && f.slug! !== "subjects/index" && !f.frontmatter?.noindex,
  //     linkToMore: "subjects/" as SimpleSlug,
  //   }),
  // ),
  // Component.DesktopOnly(
  //   Component.RecentNotes({
  //     title: "Recent Notes",
  //     limit: 2,
  //     filter: (f) =>
  //       f.slug!.startsWith("notes/") && f.slug! !== "notes/index" && !f.frontmatter?.noindex,
  //     linkToMore: "notes/" as SimpleSlug,
  //   }),
  // ),
  // Component.Explorer(),
  // Component.DesktopOnly(Component.TagList()),
  // Component.DesktopOnly(Component.TableOfContents()),
  Component.Backlinks(),
  // Component.DesktopOnly(Component.TableOfContents()),
  Component.DesktopOnly(Component.TagList()),
  // Component.TagList(),
],
  
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.DesktopOnly(Component.PageTitle()),
    Component.MobileOnly(Component.PageTitleMobile()),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
    Component.FloatingButtons({position: 'right'}),
  ],
  right: [],
}
