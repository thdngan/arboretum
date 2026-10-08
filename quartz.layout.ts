import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { Options as ExplorerOptions } from "./quartz/components/Explorer"
import { Options as RecentNotesOptions } from "./quartz/components/RecentNotes"
import { SimpleSlug } from "./quartz/util/path"

// Constants for config
const tagsToRemove = ["graph-exclude", "explorer-exclude", "backlinks-exclude", "recents-exclude"]
const graphConfig = {
  localGraph: {
    removeTags: tagsToRemove,
    excludeTags: ["graph-exclude"],
    repelForce: 1.0,
    centerForce: 0.3,
    linkDistance: 45,
    fontSize: 0.45,
  },
  globalGraph: {
    removeTags: tagsToRemove,
    excludeTags: ["graph-exclude"],
    repelForce: 1.3,
    centerForce: 0.25,
    linkDistance: 60,
    fontSize: 0.45,
  }
};
const topicsConfig = {
  title: "Topics",
  exclude: [
    ...tagsToRemove,
    "notes",
    "writings",
    "notebooks",
    "discussions",
    "incomplete",
    "hypothetical",
    "empty",
  ],
};
const explorerConfig: Partial<ExplorerOptions> = {
  sortFn: (a, b) => {
    if (a.isFolder && !b.isFolder) return -1;
    if (!a.isFolder && b.isFolder) return 1;

    if (a.isFolder && b.isFolder) {
      var order =["posts","notebooks","notes_folder","empty"];
      var indexA = order.indexOf(a.slugSegment);
      var indexB = order.indexOf(b.slugSegment);

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    }

    if (!a.isFolder && !b.isFolder) {
      var fileA = (a as any).file || (a as any).data;
      var fileB = (b as any).file || (b as any).data;

      var dateA = fileA && fileA.date ? new Date(fileA.date).getTime() : 0;
      var dateB = fileB && fileB.date ? new Date(fileB.date).getTime() : 0;

      if (dateA > 0 && dateB > 0 && dateA !== dateB) {
        return dateB - dateA;
      }

      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    }

    return 0;
  }
};
export const latelyConfig: Partial<RecentNotesOptions> = {
  title: "Lately",
  showTitle: false,
  // marker: "•",
  datePosition: "before",
  limit: 5,
  filter: (f) =>
    f.slug!.startsWith("posts/") && f.slug! !== "posts/index" && !f.frontmatter?.noindex,
  linkToMore: "posts/" as SimpleSlug,
};

const isListPage = (slug: string) => slug.startsWith("tags/") || slug.endsWith("/index")

const isHome = (slug: string) => slug === "index"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.DesktopOnly(
      Component.Typography(),
    ),
    Component.DesktopOnly(
      Component.ReaderMode(),
    ),
    Component.DesktopOnly(
      Component.Darkmode(),
    )
  ],
  // afterBody: Explorer[],
  afterBody: [
    Component.KeyDialogs(),
    // Component.ConditionalRender({
    //   component: Component.NarrowOnly(
    //     Component.KeyRow({ keys: ["guide", "colophon", "hub"] }),
    //   ),
    //   condition: (page) => isHome(page.fileData.slug!),
    // }),
    Component.RecentNotes(latelyConfig),
    Component.ConditionalRender({
      component: Component.NarrowOnly(Component.Signpost({ variant: "post" })),
      condition: (page) => isHome(page.fileData.slug!),
    }),
    // Component.ConditionalRender({
    //   component: Component.KeyRow({ keys: ["guide","home"] }),
    //   condition: (page) => isListPage(page.fileData.slug!),
    // }),
    // Component.ConditionalRender({
    //   component: Component.NarrowOnly(Component.KeyRow({ keys: ["guide", "home"] })),
    //   condition: (page) =>
    //     !isHome(page.fileData.slug!) && !isListPage(page.fileData.slug!),
    // }),
    Component.ConditionalRender({
      component: Component.Dinkus(),
      condition: (page) => isHome(page.fileData.slug!),
    }),
    // Component.MobileOnly(Component.Topics(topicsConfig)),
    // Component.ConditionalRender({
    //   component: Component.Dinkus({ mobileOnly: true }),
    //   condition: (page) => isHome(page.fileData.slug!),
    // }),
    // guestbook (not) hidden for now
    
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: "thdngan/arboretum",
        // from data-repo-id
        repoId: "R_kgDOUrsDUg",
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: "DIC_kwDOUrsDUs4DGfXj",
        mapping: "pathname",
        strict: false,
        reactionsEnabled: false,
        themeUrl: "https://thdngan.github.io/arboretum/static/giscus", // corresponds to quartz/static/giscus/
        lightTheme: "light", // corresponds to light-theme.css in quartz/static/giscus/
        darkTheme: "dark", // corresponds to dark-theme.css quartz/static/giscus/
        inputPosition: "top",
      }
    }),
    
  ],
  footer: Component.Footer({
    links: {
      // GitHub: "https://github.com/thdngan",
      "About": "https://thdngan.github.io/",
      "Contact": "mailto:xin.chaof@pm.me",
    },

  }),

}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ConditionalRender({
      component: Component.Signpost({ variant: "banner" }),
      condition: (page) => isHome(page.fileData.slug!),
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.TagList_noheading(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    // Component.MobileOnly(Component.TagList_noheading()),

  ],
  left: [
    
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    // Component.Search(),
    // Component.Darkmode(),
    // Component.Row([
    //   Component.Search(),
    //   Component.Darkmode(),
    // ]),
    Component.MobileOnly(
      Component.Typography(),
    ),
    Component.MobileOnly(
      Component.ReaderMode(),
    ),
    Component.MobileOnly(
      Component.Darkmode(),
    ),
    Component.Search(),
    Component.Explorer(explorerConfig),
    // Component.DesktopOnly(
    //   Component.RecentNotes({
    //     title: "Lately",
    //     limit: 4,
    //     filter: (f) =>
    //       f.slug!.startsWith("posts/") && f.slug! !== "posts/index" && !f.frontmatter?.noindex,
    //     linkToMore: "posts/" as SimpleSlug,
    //   }),
    // ),
    Component.DesktopOnly(Component.Topics(topicsConfig)),
    // Component.ConditionalRender({
    //   component: Component.DesktopOnly(Component.Backlinks()),
    //   condition: (page) => !isHome(page.fileData.slug!),
    // }),

    // Component.DesktopOnly(
    //   Component.RecentNotes({
    //     title: "Recent Notes",
    //     limit: 2,
    //     filter: (f) =>
    //       f.slug!.startsWith("notes_folder/") && f.slug! !== "notes_folder/index" && !f.frontmatter?.noindex,
    //     linkToMore: "notes_folder/" as SimpleSlug,
    //   })),

    Component.FloatingButtons({ position: 'right' }),
    

  ],
  right: [
    Component.TocDrawer(),
    Component.Graph(graphConfig),
    Component.DesktopOnly(Component.TableOfContents()),
    // Component.ConditionalRender({
    //   component: Component.WideOnly(
    //     Component.KeyRow({ keys: ["guide", "colophon", "hub"], stack: true }),
    //   ),
    //   condition: (page) => isHome(page.fileData.slug!),
    // }),
    // Component.ConditionalRender({
    //   component: Component.WideOnly(
    //     Component.KeyRow({ keys: ["home","guide"], stack: true }),
    //   ),
    //   condition: (page) => !isHome(page.fileData.slug!),
    // }),
    // Component.Backlinks(),
    // Component.ConditionalRender({
    //   component: Component.DesktopOnly(Component.TagList()),
    //   condition: (page) => !isHome(page.fileData.slug!),
    // }),
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

    Component.MobileOnly(
      Component.Typography(),
    ),
    Component.MobileOnly(
      Component.ReaderMode(),
    ),
    Component.MobileOnly(
      Component.Darkmode(),
    ),
    Component.Search(),
    // Component.Search(),
    // Component.Darkmode(),
    Component.Explorer(explorerConfig),
    Component.FloatingButtons({position: 'right'}),
  ],
  right: [Component.Graph({ ...graphConfig, localPanel: false })],
}
