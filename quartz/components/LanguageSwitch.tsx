import { FullSlug, resolveRelative, stripSlashes } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/languageSwitch.scss"

const languageLabels: Record<string, string> = {
  en: "English",
  ko: "한국어",
}

const LanguageSwitch: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const translation = fileData.frontmatter?.translation
  if (typeof translation !== "string" || translation.length === 0) {
    return null
  }

  const lang = typeof fileData.frontmatter?.lang === "string" ? fileData.frontmatter.lang : ""
  const targetLang = lang === "ko" ? "en" : "ko"
  const label = languageLabels[targetLang]
  const href = translation.startsWith("http")
    ? translation
    : resolveRelative(fileData.slug!, stripSlashes(translation) as FullSlug)

  return (
    <nav class="language-switch" aria-label="Language">
      <a href={href} class="internal">
        {label}
      </a>
    </nav>
  )
}

LanguageSwitch.css = style

export default (() => LanguageSwitch) satisfies QuartzComponentConstructor
