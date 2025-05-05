import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

// Constants for config
const tagsToRemove = ["graph-exclude", "explorer-exclude", "backlinks-exclude", "recents-exclude"]
const graphConfig = {
  localGraph: {
    removeTags: tagsToRemove,
    excludeTags: ["graph-exclude"]
  },
  globalGraph: {
    removeTags: tagsToRemove,
    excludeTags: ["graph-exclude"]
  }
};

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  // afterBody: Explorer[],
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
        mapping: "pathname",
        strict: false,
        themeUrl: "https://thdngan.github.io/arboretum/static/giscus", // corresponds to quartz/static/giscus/
        lightTheme: "light", // corresponds to light-theme.css in quartz/static/giscus/
        darkTheme: "dark", // corresponds to dark-theme.css quartz/static/giscus/
        inputPosition: "top",
      }
    }),
  ],
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
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.MobileOnly(Component.TagList_noheading()),
      condition: (page) => page.fileData.slug !== "index",
    }),
    // Component.MobileOnly(Component.TagList_noheading()),

  ],
  left: [
    
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    // Component.Search(),
    // Component.Darkmode(),\
    // Component.Row([
    //   Component.Search(),
    //   Component.Darkmode(),
    // ]),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true, // Search will grow to fill available space
        },
        { Component: Component.Darkmode() }, // Darkmode keeps its natural size
      ],
      direction: "row",
      gap: "1rem",
    }),
    Component.MobileOnly(Component.Explorer()),
    // Component.Explorer(),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recent writing",
        limit: 4,
        filter: (f) =>
          f.slug!.startsWith("posts/") && f.slug! !== "posts/index" && !f.frontmatter?.noindex,
        linkToMore: "posts/" as SimpleSlug,
      }),
    ),

    // Component.DesktopOnly(
    //   Component.RecentNotes({
    //     title: "Recent Notes",
    //     limit: 2,
    //     filter: (f) =>
    //       f.slug!.startsWith("notes_folder/") && f.slug! !== "notes_folder/index" && !f.frontmatter?.noindex,
    //     linkToMore: "notes_folder/" as SimpleSlug,
    //   })),
    
    Component.DesktopOnly(Component.TableOfContents()),
    
    Component.FloatingButtons({ position: 'right' }),
    // Component.Explorer(),
    

  ],
  right: [
    Component.Graph(graphConfig),
    Component.Backlinks(),
    Component.DesktopOnly(Component.TagList()),
    // Component.TagList(),
  ],

}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    // Component.MobileOnly(Component.PageTitleMobile()),
    Component.MobileOnly(Component.Spacer()),
    // Component.Row([
    //   Component.Search(),
    //   Component.Darkmode(),
    // ]),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true, // Search will grow to fill available space
        },
        { Component: Component.Darkmode() }, // Darkmode keeps its natural size
      ],
      direction: "row",
      gap: "1rem",
    }),
    // Component.Search(),
    // Component.Darkmode(),
    Component.Explorer(),
    Component.FloatingButtons({position: 'right'}),
  ],
  right: [],
}
