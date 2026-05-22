import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import RecentNotesForIndex from "./quartz/components/RecentNotesForIndex"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/hanjoonbae/blog",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    RecentNotesForIndex,
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
        { Component: Component.LanguageSwitch() },
      ],
    }),
    Component.Explorer(),
    Component.GoogleAppointment({
      url: "https://calendar.google.com/calendar/appointments/AcZssZ1WWSGB_CFROgacLjk_WBrwn0ck_CIe7bRaku0=?gv=true",
      color: "#284B63",
      label: "Book a time",
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
    Component.GoogleAppointment({
      url: "https://calendar.google.com/calendar/appointments/AcZssZ1WWSGB_CFROgacLjk_WBrwn0ck_CIe7bRaku0=?gv=true",
      color: "#284B63",
      label: "Book a time",
    }),
  ],
  right: [],
}
