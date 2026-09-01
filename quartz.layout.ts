import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

// Constants for config
const tagsToRemove = ["graph-exclude", "explorer-exclude", "backlinks-exclude", "recents-exclude"]
// force values tuned to feel like Obsidian's graph view.
// obsidian slider -> quartz option:
//   center force  -> centerForce   (how hard the layout is pulled back to the middle)
//   repel force   -> repelForce    (node-to-node repulsion, scaled by -100 internally)
//   link distance -> linkDistance  (rest length of each link spring, in px)
// fontSize scales the node titles (0.45 -> ~7px, drawn below each node)
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

// pages rendered with defaultListPageLayout: every tag page, plus the folder
// index pages. The home page is slug "index", with no slash, so it is excluded.
const isListPage = (slug: string) => slug.startsWith("tags/") || slug.endsWith("/index")

const isHome = (slug: string) => slug === "index"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  // afterBody: Explorer[],
  afterBody: [
    // the panels the keys open, rendered once wherever a key can appear
    Component.KeyDialogs(),
    // home, below desktop: the three keys stay in the content flow
    Component.ConditionalRender({
      component: Component.NarrowOnly(
        Component.KeyRow({ keys: ["guide", "colophon", "hub"] }),
      ),
      condition: (page) => isHome(page.fileData.slug!),
    }),
    // list pages have no right sidebar, so their keys sit in the flow at every width
    Component.ConditionalRender({
      component: Component.KeyRow({ keys: ["home", "guide"] }),
      condition: (page) => isListPage(page.fileData.slug!),
    }),
    // posts: the sidebar carries these on desktop, so only below it
    Component.ConditionalRender({
      component: Component.NarrowOnly(Component.KeyRow({ keys: ["home", "guide"] })),
      condition: (page) =>
        !isHome(page.fileData.slug!) && !isListPage(page.fileData.slug!),
    }),
    Component.MobileOnly(
      Component.RecentNotes({
        title: "Recent writings",
        limit: 5,
        filter: (f) =>
          f.slug!.startsWith("posts/") && f.slug! !== "posts/index" && !f.frontmatter?.noindex,
        linkToMore: "posts/" as SimpleSlug,
      }),
    ),
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
        // no emoji reaction bar above the comment box
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
      "Contact": "mailto:ngan.trinh@ens.psl.eu",
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
    // Component.Darkmode(),
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
        { Component: Component.DesktopOnly(Component.ReaderMode()) },
      ],
      direction: "row",
      gap: "1rem",
    }),
    Component.MobileOnly(
      Component.Explorer({
        sortFn: (a, b) => {
          // 1. Folders above files
          if (a.isFolder && !b.isFolder) return -1;
          if (!a.isFolder && b.isFolder) return 1;

          // 2. Custom folder order
          if (a.isFolder && b.isFolder) {
            var order =["empty", "posts", "notes_folder"];
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

          // 3. File sorting by Date (Newest first)
          if (!a.isFolder && !b.isFolder) {
            // Ultra-safe check for the data payload
            var fileA = (a as any).file || (a as any).data;
            var fileB = (b as any).file || (b as any).data;

            var dateA = fileA && fileA.date ? new Date(fileA.date).getTime() : 0;
            var dateB = fileB && fileB.date ? new Date(fileB.date).getTime() : 0;

            // If both have valid dates, sort newest to oldest
            if (dateA > 0 && dateB > 0 && dateA !== dateB) {
              return dateB - dateA; 
            }

            // Fallback to alphabetical if dates are missing
            return a.displayName.localeCompare(b.displayName, undefined, {
              numeric: true,
              sensitivity: "base",
            });
          }

          return 0;
        }
      }),
    ),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recent writings",
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
    

  ],
  right: [
    Component.Graph(graphConfig),
    // home: the three keys take the tag list's place
    Component.ConditionalRender({
      component: Component.WideOnly(
        Component.KeyRow({ keys: ["guide", "colophon", "hub"], stack: true }),
      ),
      condition: (page) => isHome(page.fileData.slug!),
    }),
    // posts: home + getting around, directly below the map
    Component.ConditionalRender({
      component: Component.WideOnly(
        Component.KeyRow({ keys: ["home", "guide"], stack: true }),
      ),
      condition: (page) => !isHome(page.fileData.slug!),
    }),
    Component.Backlinks(),
    // no tag list on the home page: the keys replace it
    Component.ConditionalRender({
      component: Component.DesktopOnly(Component.TagList()),
      condition: (page) => !isHome(page.fileData.slug!),
    }),
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
    Component.Explorer({
      sortFn: (a, b) => {
        // 1. Folders above files
        if (a.isFolder && !b.isFolder) return -1;
        if (!a.isFolder && b.isFolder) return 1;

        // 2. Custom folder order
        if (a.isFolder && b.isFolder) {
          var order =["empty", "posts", "notes_folder"];
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

        // 3. File sorting by Date (Newest first)
        if (!a.isFolder && !b.isFolder) {
          // Ultra-safe check for the data payload
          var fileA = (a as any).file || (a as any).data;
          var fileB = (b as any).file || (b as any).data;

          var dateA = fileA && fileA.date ? new Date(fileA.date).getTime() : 0;
          var dateB = fileB && fileB.date ? new Date(fileB.date).getTime() : 0;

          // If both have valid dates, sort newest to oldest
          if (dateA > 0 && dateB > 0 && dateA !== dateB) {
            return dateB - dateA; 
          }

          // Fallback to alphabetical if dates are missing
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        }

        return 0;
      }
    }),
    Component.FloatingButtons({position: 'right'}),
  ],
  // the map has to exist here for the floating map button and Ctrl+G to have
  // anything to open - #global-graph-outer lives inside .graph. These pages
  // already reserve an empty 320px right column, so this costs no content width.
  right: [Component.Graph({ ...graphConfig, localPanel: false })],
}
