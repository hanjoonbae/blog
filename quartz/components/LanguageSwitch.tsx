// @ts-ignore
import languageSwitchScript from "./scripts/languageSwitch.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/languageSwitch.scss"
import { classNames } from "../util/lang"
import { FullSlug, resolveRelative, stripSlashes } from "../util/path"

const languageLabels: Record<string, string> = {
  "en-US": "EN",
  "ko-KR": "KO",
}

const normalizeLocale = (locale: string) => (locale.startsWith("ko") ? "ko-KR" : "en-US")

const LanguageSwitch: QuartzComponent = ({ cfg, displayClass, fileData }: QuartzComponentProps) => {
  const locale = normalizeLocale(cfg.locale)
  const translation = fileData.frontmatter?.translation
  const translationUrl =
    typeof translation === "string" && translation.length > 0
      ? translation.startsWith("http")
        ? translation
        : resolveRelative(fileData.slug!, stripSlashes(translation) as FullSlug)
      : undefined

  return (
    <button
      type="button"
      class={classNames(displayClass, "language-switch")}
      aria-label="Switch language"
      title="Switch language"
      data-translation-url={translationUrl}
    >
      {languageLabels[locale]}
    </button>
  )
}

LanguageSwitch.beforeDOMLoaded = languageSwitchScript
LanguageSwitch.css = style

export default (() => LanguageSwitch) satisfies QuartzComponentConstructor
