type SupportedLocale = "en-US" | "ko-KR"

const storageKey = "quartz-locale"
const localeData: Record<
  SupportedLocale,
  {
    label: string
    htmlLang: string
    switchLabel: string
    values: Record<string, string>
  }
> = {
  "en-US": {
    label: "EN",
    htmlLang: "en",
    switchLabel: "Switch language. Current language: English",
    values: {
      "components.backlinks.noBacklinksFound": "No backlinks found",
      "components.backlinks.title": "Backlinks",
      "components.contentMeta.readingTime": "{minutes} min read",
      "components.explorer.title": "Explorer",
      "components.footer.createdWith": "Created with",
      "components.graph.title": "Graph View",
      "components.readerMode.title": "Reader mode",
      "components.recentNotes.seeRemainingMore": "See {remaining} more ->",
      "components.recentNotes.title": "Recent Notes",
      "components.search.searchBarPlaceholder": "Search for something",
      "components.search.title": "Search",
      "components.tableOfContents.title": "Table of Contents",
      "components.themeToggle.darkMode": "Dark mode",
      "components.themeToggle.lightMode": "Light mode",
    },
  },
  "ko-KR": {
    label: "KO",
    htmlLang: "ko",
    switchLabel: "Switch language. Current language: Korean",
    values: {
      "components.backlinks.noBacklinksFound": "백링크가 없습니다.",
      "components.backlinks.title": "백링크",
      "components.contentMeta.readingTime": "{minutes} min read",
      "components.explorer.title": "탐색기",
      "components.footer.createdWith": "Created with",
      "components.graph.title": "그래프 뷰",
      "components.readerMode.title": "리더 모드",
      "components.recentNotes.seeRemainingMore": "{remaining}건 더보기 ->",
      "components.recentNotes.title": "최근 게시글",
      "components.search.searchBarPlaceholder": "검색어를 입력하세요",
      "components.search.title": "검색",
      "components.tableOfContents.title": "목차",
      "components.themeToggle.darkMode": "다크 모드",
      "components.themeToggle.lightMode": "라이트 모드",
    },
  },
}

const normalizeLocale = (locale: string | null | undefined): SupportedLocale | undefined => {
  if (!locale) return undefined
  return locale.startsWith("ko") ? "ko-KR" : locale.startsWith("en") ? "en-US" : undefined
}

const getStoredLocale = (): SupportedLocale | undefined => {
  try {
    return normalizeLocale(localStorage.getItem(storageKey))
  } catch {
    return undefined
  }
}

const setStoredLocale = (locale: SupportedLocale) => {
  try {
    localStorage.setItem(storageKey, locale)
  } catch {}
}

const getDefaultLocale = (): SupportedLocale =>
  normalizeLocale(document.documentElement.lang) ??
  normalizeLocale(document.documentElement.dataset.locale) ??
  "en-US"

const getPageLocale = (): SupportedLocale | undefined =>
  normalizeLocale(document.body?.dataset.pageLocale)

const interpolate = (template: string, el: HTMLElement) =>
  template.replace(/\{(\w+)\}/g, (_, key) => el.dataset[key] ?? "")

const translate = (key: string, locale: SupportedLocale, el: HTMLElement) => {
  const value = localeData[locale].values[key]
  return value ? interpolate(value, el) : undefined
}

const applyLocale = (locale: SupportedLocale) => {
  const data = localeData[locale]
  const localeDatasetSuffix = locale === "ko-KR" ? "Ko" : "En"

  document.documentElement.dataset.locale = locale
  document.documentElement.lang = data.htmlLang
  document.documentElement.dir = "ltr"

  document.querySelectorAll<HTMLButtonElement>(".language-switch").forEach((button) => {
    button.textContent = data.label
    button.ariaLabel = data.switchLabel
    button.title = data.switchLabel
  })

  document.querySelectorAll<HTMLElement>("[data-i18n-key]").forEach((el) => {
    const key = el.dataset.i18nKey
    if (!key) return
    const value = translate(key, locale, el)
    if (value) el.textContent = value
  })

  document.querySelectorAll<HTMLElement>("[data-i18n-aria-label-key]").forEach((el) => {
    const key = el.dataset.i18nAriaLabelKey
    if (!key) return
    const value = translate(key, locale, el)
    if (value) el.setAttribute("aria-label", value)
  })

  document.querySelectorAll<HTMLElement>("[data-i18n-title-key]").forEach((el) => {
    const key = el.dataset.i18nTitleKey
    if (!key) return
    const value = translate(key, locale, el)
    if (value) el.setAttribute("title", value)
  })

  document.querySelectorAll<HTMLInputElement>("[data-i18n-placeholder-key]").forEach((el) => {
    const key = el.dataset.i18nPlaceholderKey
    if (!key) return
    const value = translate(key, locale, el)
    if (value) el.placeholder = value
  })

  document.querySelectorAll<HTMLAnchorElement>("[data-locale-title-en]").forEach((el) => {
    const title = el.dataset[`localeTitle${localeDatasetSuffix}`]
    const href = el.dataset[`localeHref${localeDatasetSuffix}`]
    if (title) el.textContent = title
    if (href) el.href = href
  })

  document.querySelectorAll<HTMLTimeElement>("[data-locale-datetime-en]").forEach((el) => {
    const datetime = el.dataset[`localeDatetime${localeDatasetSuffix}`]
    if (datetime) el.dateTime = datetime
  })

  document.querySelectorAll<HTMLTimeElement>("time[data-locale-date]").forEach((el) => {
    const date = new Date(el.dateTime)
    if (!Number.isNaN(date.getTime())) {
      el.textContent = date.toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    }
  })
}

let currentLocale = getPageLocale() ?? getStoredLocale() ?? getDefaultLocale()
applyLocale(currentLocale)

document.addEventListener("nav", () => {
  currentLocale = getPageLocale() ?? getStoredLocale() ?? currentLocale
  applyLocale(currentLocale)

  const switchLanguage = (event: Event) => {
    const button = event.currentTarget as HTMLElement
    const translationUrl = button.dataset.translationUrl

    currentLocale = currentLocale === "en-US" ? "ko-KR" : "en-US"
    setStoredLocale(currentLocale)
    applyLocale(currentLocale)
    document.dispatchEvent(
      new CustomEvent("localechange", {
        detail: { locale: currentLocale },
      }),
    )

    if (translationUrl) {
      const url = new URL(translationUrl, window.location.toString())
      if (url.origin === window.location.origin) {
        window.spaNavigate(url, false)
      } else {
        window.location.assign(url)
      }
    }
  }

  for (const button of document.getElementsByClassName("language-switch")) {
    button.addEventListener("click", switchLanguage)
    window.addCleanup(() => button.removeEventListener("click", switchLanguage))
  }
})
