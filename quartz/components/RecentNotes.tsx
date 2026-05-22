import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative, stripSlashes } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/recentNotes.scss"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

interface Options {
  title?: string
  limit: number
  linkToMore: SimpleSlug | false
  showTags: boolean
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
}

const isHidden = (file: QuartzPluginData) =>
  file.frontmatter?.hide === true || file.frontmatter?.hide === "true"

const normalizeLang = (lang: unknown): "en" | "ko" =>
  typeof lang === "string" && lang.startsWith("ko") ? "ko" : "en"

const translationSlug = (file: QuartzPluginData): FullSlug | undefined => {
  const translation = file.frontmatter?.translation
  if (
    typeof translation !== "string" ||
    translation.length === 0 ||
    translation.startsWith("http")
  ) {
    return undefined
  }

  return stripSlashes(translation) as FullSlug
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  limit: 3,
  linkToMore: false,
  showTags: true,
  filter: () => true,
  sort: byDateAndAlphabetical(cfg),
})

export default ((userOpts?: Partial<Options>) => {
  const RecentNotes: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const filesBySlug = new Map(allFiles.map((file) => [file.slug, file]))
    const pages = allFiles
      .filter((file) => !isHidden(file))
      .filter(opts.filter)
      .sort(opts.sort)
    const remaining = Math.max(0, pages.length - opts.limit)
    const titleAttrs = opts.title ? {} : { "data-i18n-key": "components.recentNotes.title" }
    return (
      <div class={classNames(displayClass, "recent-notes")}>
        <h3 {...titleAttrs}>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h3>
        <ul class="recent-ul">
          {pages.slice(0, opts.limit).map((page) => {
            const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
            const tags = page.frontmatter?.tags ?? []
            const translation = filesBySlug.get(translationSlug(page))
            const localizedPages = [page, translation].filter(
              (file): file is QuartzPluginData => file !== undefined,
            )
            const enPage = localizedPages.find(
              (file) => normalizeLang(file.frontmatter?.lang) === "en",
            )
            const koPage = localizedPages.find(
              (file) => normalizeLang(file.frontmatter?.lang) === "ko",
            )
            const enTitle = enPage?.frontmatter?.title ?? title
            const koTitle = koPage?.frontmatter?.title ?? enTitle
            const enHref = resolveRelative(fileData.slug!, (enPage ?? page).slug!)
            const koHref = resolveRelative(fileData.slug!, (koPage ?? enPage ?? page).slug!)
            const enDate = enPage?.dates ? getDate(cfg, enPage)?.toISOString() : undefined
            const koDate = koPage?.dates ? getDate(cfg, koPage)?.toISOString() : enDate

            return (
              <li class="recent-li">
                <div class="section">
                  <div class="desc">
                    <h3>
                      <a
                        href={enHref}
                        class="internal"
                        data-locale-title-en={enTitle}
                        data-locale-title-ko={koTitle}
                        data-locale-href-en={enHref}
                        data-locale-href-ko={koHref}
                      >
                        {title}
                      </a>
                    </h3>
                  </div>
                  {page.dates && (
                    <p class="meta">
                      <Date
                        date={getDate(cfg, page)!}
                        locale={cfg.locale}
                        localizedDates={{ en: enDate, ko: koDate }}
                      />
                    </p>
                  )}
                  {opts.showTags && (
                    <ul class="tags">
                      {tags.map((tag) => (
                        <li>
                          <a
                            class="internal tag-link"
                            href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                          >
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
        {opts.linkToMore && remaining > 0 && (
          <p>
            <a
              href={resolveRelative(fileData.slug!, opts.linkToMore)}
              data-i18n-key="components.recentNotes.seeRemainingMore"
              data-remaining={remaining}
            >
              {i18n(cfg.locale).components.recentNotes.seeRemainingMore({ remaining })}
            </a>
          </p>
        )}
      </div>
    )
  }

  RecentNotes.css = style
  return RecentNotes
}) satisfies QuartzComponentConstructor
