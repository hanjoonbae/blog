import { PageFrame, PageFrameProps } from "./types"
import HeaderConstructor from "../Header"
import { FullSlug, resolveRelative } from "../../util/path"

const Header = HeaderConstructor()

// Fixed top-nav: English label -> category folder slug. Folder names are Korean
// (공부 / 구현 / 논문 리뷰), so the labels are mapped here by hand. See DESIGN.md.
const NAV_ITEMS: { label: string; slug: FullSlug }[] = [
  { label: "AWS", slug: "aws-saa/index" as FullSlug },
  { label: "Databricks", slug: "databricks-dea/index" as FullSlug },
  { label: "Study", slug: "공부/index" as FullSlug },
  { label: "Builds", slug: "구현/index" as FullSlug },
  { label: "Papers", slug: "논문-리뷰/index" as FullSlug },
]

/**
 * The default page frame — stefan-style single-column layout: a top header row
 * with the site name (left) and a fixed English category nav (right), then the
 * centered content + footer. No left/right sidebars.
 */
export const DefaultFrame: PageFrame = {
  name: "default",
  render({
    componentData,
    header,
    beforeBody,
    pageBody: Content,
    afterBody,
    footer: Footer,
  }: PageFrameProps) {
    const currentSlug = componentData.fileData.slug!
    const title = componentData.cfg.pageTitle
    const homeHref = resolveRelative(currentSlug, "index" as FullSlug)
    return (
      <>
        <div class="center">
          <div class="page-header">
            <Header {...componentData}>
              {[
                <h1 class="site-name">
                  <a href={homeHref}>{title}</a>
                </h1>,
                <nav class="top-nav">
                  {NAV_ITEMS.map(({ label, slug }) => (
                    <a class="internal" href={resolveRelative(currentSlug, slug)}>
                      {label}
                    </a>
                  ))}
                </nav>,
                ...header.map((HeaderComponent) => <HeaderComponent {...componentData} />),
              ]}
            </Header>
            <div class="popover-hint">
              {beforeBody.map((BodyComponent) => (
                <BodyComponent {...componentData} />
              ))}
            </div>
          </div>
          <Content {...componentData} />
          <hr />
          <div class="page-footer">
            {afterBody.map((BodyComponent) => (
              <BodyComponent {...componentData} />
            ))}
          </div>
        </div>
        <Footer {...componentData} />
      </>
    )
  },
}
