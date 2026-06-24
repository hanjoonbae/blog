---
omd: 0.1
brand: Hanjoon Bae (기술 블로그)
bootstrapped_from: stefanzweifel.dev (user-supplied spec)
bootstrapped_at: 2026-06-24T08:08:52Z
primary_color: "#0f172a"
tokens:
  source: prose-derived (from user-supplied stefan.md spec — stefanzweifel.dev)
  colors:
    foreground: "#0f172a" # slate-900 — body / heading text
    heading: "#1e293b" # slate-800 — section titles, link text
    body: "#475569" # slate-600 — paragraph body, nav, secondary
    meta: "#6b7280" # gray-500 — date / metadata
    canvas: "#ffffff" # page background
    surface-hover: "rgba(248,250,252,0.25)" # slate-50/25 — card hover
    border: "#cbd5e1" # slate-300 — card hover border (dashed)
    code-bg: "#111827" # gray-900 — code block background
    code-fg: "#e5e7eb" # gray-200 — code block text
    selection-bg: "#fef4ad" # pale-yellow selection
    selection-fg: "#160404" # near-black selection text
    link: "#1e293b" # slate-800 — links (underline by default)
    dark-canvas: "#020617" # slate-950 — dark page background
    dark-surface: "#0f172a" # slate-900 — dark cards
    dark-border: "#1e293b" # slate-800 — dark borders
    dark-body: "#94a3b8" # slate-400 — dark secondary text
    dark-fg: "#e2e8f0" # slate-200 — dark primary text
    dark-link: "#cbd5e1" # slate-300 — dark links
  typography:
    family:
      {
        sans: "ui-sans-serif, system-ui, sans-serif (system stack)",
        mono: "JetBrains Mono, ui-monospace, Menlo, monospace",
      }
    name-h1: { size: 16, weight: 500, lineHeight: 1.5, use: "Name / site title (h1)" }
    role-h2: { size: 16, weight: 500, lineHeight: 1.5, use: "Subtitle / role (h2)" }
    section-h3: { size: 16, weight: 500, lineHeight: 1.5, use: "Section headings (h3)" }
    body: { size: 16, weight: 400, lineHeight: 1.75, use: "Paragraph body text" }
    nav: { size: 14, weight: 500, lineHeight: 1.5, use: "Navigation links" }
    meta: { size: 16, weight: 400, use: "Date / metadata" }
    project-name: { size: 16, weight: 600, use: "Project / post titles in lists" }
    project-desc: { size: 14, weight: 400, use: "Project / post descriptions" }
  spacing: { xs: 4, sm: 8, md: 16, base: 16, lg: 24, xl: 32, xxl: 48 }
  layout: { reading-measure: 672, container: "max-w-2xl (672px), centered single column" }
  rounded: { sm: 4, md: 8, lg: 8, full: 9999 }
---

# Design System — Hanjoon Bae 기술 블로그

> Bootstrapped from a user-supplied spec of **stefanzweifel.dev** — a minimalist personal
> blog the author likes. Tokens taken directly from that spec; domain adapted to a personal
> Korean tech/engineering blog (AWS, Databricks, 논문 리뷰, 구현, 공부).
> Content-first, single-column reading is the whole job of the surface.

## 1. Visual Theme & Atmosphere

This blog takes minimalism as its core principle: no decorative chrome, maximum content legibility, and a single point of personality — a 2px rainbow gradient bar across the very top of the page. Everything else recedes. The page is a centered single column on white (`#ffffff`), roughly 672px wide, so the eye never has to track across a wide measure. There are no cards-with-shadows, no boxes competing for attention — just text on white, spaced to be read.

The palette is an exercise in restraint: a slate-gray scale carries the entire hierarchy. Body and headings sit in near-black slate (`#0f172a`), section titles and links a step lighter (`#1e293b`), paragraph body and navigation lighter still (`#475569`), and metadata in a neutral gray (`#6b7280`). There is no solid brand color anywhere on the reading surface — color enters only through the top gradient bar and a pale-yellow text-selection highlight (`#fef4ad`).

What gives the surface its character is the weight-driven hierarchy. Headings (h1–h3) and body all sit at the same 16px size; the difference between a name, a section title, and a paragraph is carried almost entirely by font-weight (500 for headings, 400 for body) and color, not by size. It reads quiet and even, like a well-set document rather than a marketing page.

**Key Characteristics:**

- Centered single column, ~672px reading measure on a pure white canvas
- Slate-gray scale carries the full hierarchy — no solid brand color on the reading surface
- One signature accent: a 2px rainbow gradient bar at the top of the page
- System font stack for sans (San Francisco / Segoe UI / system Hangul); JetBrains Mono for code
- Weight-and-color-driven hierarchy — h1–h3 share a 16px size, differentiated by weight
- Links underlined by default, underline removed on hover — the inverse of the usual convention
- Pale-yellow selection highlight (`#fef4ad` on `#160404`) as a small warm detail

## 2. Color Palette & Roles

### Text (Slate Scale)

- **Slate 900** (`#0f172a`): Primary body text and headings — the darkest ink.
- **Slate 800** (`#1e293b`): Section titles and link text — one step lighter.
- **Slate 600** (`#475569`): Paragraph body, navigation, secondary text, project descriptions.
- **Gray 500** (`#6b7280`): Date and metadata — the most de-emphasized text.

### Background & Surface

- **White** (`#ffffff`): Page background. The whole reading surface.
- **Slate 50 / 25%** (`rgba(248,250,252,0.25)`): Card hover background — barely-there tint.
- **Code Background** (`#111827`, gray-900): Code block surface.
- **Code Text** (`#e5e7eb`, gray-200): Code block text.

### Accent — Rainbow Gradient Bar

- The single decorative element: a **2px-tall** rainbow-spectrum gradient bar fixed at the top of the page, softened with a blur layer for a gentle glow. It is the only chromatic moment; there is no solid brand color to use anywhere else. Do not introduce a second accent color.

### Selection

- **Selection Background** (`#fef4ad`): Pale-yellow highlight on text selection.
- **Selection Text** (`#160404`): Near-black selected text.

### Interactive States

- **Link** (`#1e293b`): Underlined by default; `hover` removes the underline (no color change).
- **Logo hover**: `#f3f4f6` (gray-100) background with rounded corners.
- **Card hover**: Slate-50/25 background + Slate 300 (`#cbd5e1`) **dashed** border.

### Dark Mode (slate-derived)

_stefan.md is white-only; the dark theme is derived by inverting the slate scale so the toggle stays palette-consistent._

- **Dark Canvas** (`#020617`, slate-950): Dark page background.
- **Dark Surface** (`#0f172a`, slate-900): Dark cards / elevated surfaces.
- **Dark Border** (`#1e293b`, slate-800): Borders and dividers on dark.
- **Dark Body** (`#94a3b8`, slate-400): Secondary text on dark.
- **Dark Foreground** (`#e2e8f0`, slate-200): Primary text / headings on dark.
- **Dark Link** (`#cbd5e1`, slate-300): Links on dark.

## 3. Typography Rules

### Font Family

- **Sans**: system font stack — `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`. Renders as San Francisco (macOS/iOS), Segoe UI (Windows), Roboto (Android), with the OS default Hangul face for Korean.
- **Code**: `JetBrains Mono, "SFMono-Regular", ui-monospace, Menlo, Monaco, Consolas, monospace`.

_Note: stefan.md uses no web fonts for body — the system stack is the deliberate choice. Korean text renders in the OS Hangul face (애플 SD산돌고딕 / 맑은 고딕), which keeps the surface fast and native._

### Type Scale

| Element                    | Size | Weight | Line Height | Color                 |
| -------------------------- | ---- | ------ | ----------- | --------------------- |
| `<body>`                   | 16px | 400    | 1.5         | Slate 900 (`#0f172a`) |
| `<h1>` (name / title)      | 16px | 500    | 1.5         | Slate 900             |
| `<h2>` (role / subtitle)   | 16px | 500    | 1.5         | Slate 600 (`#475569`) |
| `<h3>` (section heading)   | 16px | 500    | 1.5         | Slate 900             |
| `<p>` (paragraph)          | 16px | 400    | 1.75        | Slate 600–700         |
| Navigation link            | 14px | 500    | —           | Slate 600             |
| Date / meta                | 16px | 400    | —           | Gray 500 (`#6b7280`)  |
| Project / post name        | 16px | 600    | —           | Slate 800 (`#1e293b`) |
| Project / post description | 14px | 400    | —           | Slate 600             |

### Principles

- **Weight, not size, makes hierarchy**: h1–h3 and body all share a 16px size. The distinction between a heading and a paragraph is carried by weight (500 vs 400) and color, not by a type-scale jump. This is the single most distinctive typographic choice — the surface reads even and quiet.
- **Generous paragraph leading**: body paragraphs run at line-height 1.75; UI/headings at 1.5. Long-form Korean reading benefits from the extra leading.
- **System stack as a feature**: no font fetch, native rendering on every platform. Fast, familiar, unbranded — the type gets out of the content's way.
- **Mono for code only**: JetBrains Mono is strictly for code blocks and inline code, never for body content.

## 4. Component Stylings

_Tokens from the stefan.md spec. The blog's relevant surfaces are post lists, links, code blocks, nav, and footer._

### Links

- Default: Slate 800 (`#1e293b`), **underlined**.
- Hover: underline removed (`no-underline`), no color change. The inverse of the usual link convention.

### Navigation

- Links in Slate 600 (`#475569`), 14px weight 500.
- Logo hover: gray-100 (`#f3f4f6`) background, rounded corners.

### Data display

- **Post / project row**: name in 16px weight 600 Slate 800; description in 14px weight 400 Slate 600. Hover: Slate-50/25 background + Slate 300 (`#cbd5e1`) **dashed** border (not solid) + rounded corners. No drop shadow.

### Code block

- Background gray-900 (`#111827`), text gray-200 (`#e5e7eb`), JetBrains Mono. Generous line-height. The one dark surface on the white page.

### Top Gradient Bar

- A 2px rainbow-spectrum gradient fixed at the top edge, with a soft blur glow. The single decorative flourish — present on every page, never repeated elsewhere.

## 5. Layout Principles

### Container

- Centered single column, max reading measure **672px** (`max-w-2xl`).
- No multi-column card grids for reading; post lists are stacked single column.
- White canvas edge-to-edge; the content column is centered with generous side margins.

### Spacing System

- Base unit: 8px. Scale: 4px, 8px, 16px, 24px, 32px, 48px.
- Generous vertical rhythm between sections; whitespace does the separating, not borders or boxes.

### Whitespace Philosophy

- **Content-first emptiness**: no decorative chrome. The white space and the slate text are the entire design.
- **Even rhythm**: because headings and body share a size, vertical spacing (margins) carries the visual rhythm of the page.

### Border Radius Scale

- Small (4px): inline code, small elements
- Standard (8px): logo hover, cards, rounded hover surfaces
- Full (9999px): any pill/tag if used

## 6. Depth & Elevation

| Level                | Treatment                                        | Use                                                |
| -------------------- | ------------------------------------------------ | -------------------------------------------------- |
| Flat (Level 0)       | No shadow, no border                             | Page background, body text, headings — the default |
| Hover tint (Level 1) | Slate-50/25 background + Slate 300 dashed border | Post/project rows on hover                         |
| Code surface         | gray-900 fill on the white page                  | Code blocks                                        |

**Shadow Philosophy**: there is essentially no elevation system — stefan.md uses **no drop shadows**. Depth and grouping come from whitespace, the occasional dashed hover border, and the dark code surface contrasting the white page. Do not add box-shadows; flatness is the identity.

## 7. Do's and Don'ts

### Do

- Keep a single centered column at ~672px reading measure
- Use the slate scale (`#0f172a` → `#475569` → `#6b7280`) for all text hierarchy
- Make hierarchy with font-weight and color, not big size jumps (h1–h3 share ~16px)
- Use the system font stack for sans; JetBrains Mono for code only
- Underline links by default and remove the underline on hover
- Keep the top 2px rainbow gradient bar as the one decorative accent
- Use the pale-yellow selection highlight (`#fef4ad` / `#160404`)
- Use dashed hover borders + faint tint for interactive rows — never drop shadows

### Don't

- Don't add a solid brand color to the reading surface — the gradient bar is the only accent
- Don't introduce drop shadows or heavy boxes — the design is flat
- Don't create large heading/body size contrast — weight carries the hierarchy
- Don't use serif or a fetched web body font — the system stack is deliberate
- Don't widen the reading column beyond a comfortable single-column measure
- Don't add warm cream backgrounds or a second accent color
- Don't keep link underlines on hover — hover removes them

## 8. Responsive Behavior

### Breakpoints

| Name             | Width  | Key Changes                                                   |
| ---------------- | ------ | ------------------------------------------------------------- |
| Mobile           | <640px | Full-width single column, reduced side padding, hamburger nav |
| Tablet / Desktop | 640px+ | Centered 672px column with growing side margins               |

### Touch Targets

- Nav and links adequately spaced; minimum 44×44px tap target.

### Collapsing Strategy

- The single-column layout is already mobile-shaped; mainly side-margin and nav adjustments at small widths.

## 9. Agent Prompt Guide

### Quick Color Reference

- Heading / body text: Slate 900 (`#0f172a`)
- Section titles / links: Slate 800 (`#1e293b`)
- Secondary / nav / paragraph: Slate 600 (`#475569`)
- Metadata: Gray 500 (`#6b7280`)
- Background: White (`#ffffff`)
- Code surface: gray-900 (`#111827`) / gray-200 text (`#e5e7eb`)
- Accent: top 2px rainbow gradient bar (no solid brand color)

### Example Component Prompts

- "Style the article body on white in the system font stack, 16px Slate 900 headings at weight 500, 16px paragraph body at weight 400 line-height 1.75 in Slate 600. Links in Slate 800, underlined, underline removed on hover. Centered single column max 672px."
- "Style a post-list row: name 16px weight 600 Slate 800, description 14px weight 400 Slate 600. Hover: slate-50/25 background + Slate 300 dashed border + rounded corners. No shadow."
- "Style a code block: gray-900 (#111827) background, gray-200 (#e5e7eb) text, JetBrains Mono."

### Iteration Guide

1. Hierarchy comes from weight + color, not size — keep headings near body size
2. No drop shadows ever; flatness is the identity
3. Slate scale only for text; the gradient bar is the single accent
4. System font for sans, JetBrains Mono for code — no fetched body font
5. Underline links by default; remove on hover

---

## 10. Voice & Tone

The voice is plain, precise, and quiet — matching the visual restraint. Titles state the topic; copy uses concrete verbs and specific nouns with no adjective stacking. Claims, when made, are numeric rather than adjectival. There is no marketing register here; it reads like a careful engineer's notes set in a clean document.

| Context                     | Tone                                                                                         |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| Post titles                 | Short, declarative, specific. No "혁신적인", "충격적인", "완벽 정리". Name the actual topic. |
| Technical explanation       | Mechanism + honest limit in one breath. State what it does and where it breaks.              |
| Error / gotcha notes        | Specific + blameless. The exact failure and the exact fix, no filler.                        |
| Documentation-style writing | Direct. "이렇게 동작한다." No "쉽게", "간단하게" as filler.                                  |
| Metadata / captions         | Factual. Dates, sources, exact numbers.                                                      |

**Forbidden phrases.** "혁신적인", "완벽한", "충격적인", "꿀팁", "당신이 몰랐던", "이것만 알면", "world-class", "game-changer". Exclamation marks on routine headings. Emoji in technical explanations, error notes, or documentation. Performative hooks ("이 글을 끝까지 읽으면…") — state the topic and get to it.

## 11. Brand Narrative

This is the personal technical blog of **Hanjoon Bae**, a data/engineering practitioner. Its thesis is the loop in the homepage tagline: **기술을 배우고, 만들고, 기록합니다** — _learn technology, build with it, and write down what was learned._ The blog is a study log first and an audience product never: posts cover what is actively being studied (AWS SAA, Databricks DEA), implementations being built (구현), and papers being read (논문 리뷰).

The visual language is borrowed from a minimalist personal blog the author admires (stefanzweifel.dev): a single centered column on white, a slate-gray scale carrying the whole hierarchy, the system font stack, and one small decorative accent — a rainbow gradient bar. It is content-first by construction. Against the dev-blog defaults of dark dashboards, decorative illustration, and marketing color, this surface keeps the chrome nearly invisible so the writing is the only thing on the page.

What this blog refuses: hype framing, clickbait titles, decorative color, drop-shadow boxes, and unqualified confidence about things still being learned. What it embraces: a quiet document-like reading surface, weight-driven hierarchy, measured language, and the discipline of recording exactly what was understood — including the parts still uncertain.

## 12. Principles

1. **기록 over performance.** A post exists to record what was actually learned, not to perform expertise. If something isn't understood yet, the post says so.
2. **Content-first minimalism.** No decorative chrome, no shadow boxes, no second accent. The white column and the slate text are the whole design.
3. **Mechanism over conclusion.** Explain how a thing works and where it breaks, in the same breath. A "정리" that omits the failure modes is incomplete.
4. **Hierarchy by weight, not noise.** Headings and body share a size; weight and color carry the structure. Quiet and even, like a document.
5. **One accent, used sparingly.** The top gradient bar is the single chromatic moment; nothing else competes.
6. **Claims are numeric.** "빌드 40% 단축" beats "훨씬 빨라짐". Hedging where the edge is real is a feature.
7. **The system font is a feature.** Native rendering, no fetch, gets out of the content's way.

## 13. Personas

_Personas below are fictional reader archetypes informed by the blog's actual subject matter (cloud/data engineering, certification study, paper reviews), not individual people._

**Studying-for-the-same-cert reader.** A working engineer preparing for AWS SAA or Databricks DEA. Lands on a post via search while studying. Wants the actual mechanism and the gotchas, not a "한 번에 합격" hook. Trusts the post more _because_ it states caveats and cites the docs.

**Practitioner cross-referencing an implementation.** Mid-level data engineer who hit the same problem the 구현 post solves. Skims for the code and the "why this and not that" reasoning. Bounces from filler intros; stays for the precise tradeoff discussion.

**Paper-review follower.** Someone tracking the same research area, reading the 논문 리뷰 posts to decide whether to read the paper themselves. Values an honest "what this paper does and doesn't show" summary over breathless framing.

**The author, six months later.** The most important reader: Hanjoon revisiting his own notes to reuse what he learned. Every post is written so future-self can reconstruct the understanding from the record — which is why mechanism, sources, and uncertainty all get written down.

## 14. States

| State                                     | Treatment                                                                                                                     |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Empty (index, no posts in a category)** | White canvas. One Gray 500 (`#6b7280`) line at 16px: "아직 글이 없습니다." No illustration, no emoji.                         |
| **Empty (search, no results)**            | One Gray 500 line: "검색 결과가 없습니다." Suggestions only if genuinely useful.                                              |
| **Loading (page / route transition)**     | White background with faint slate skeleton blocks at final dimensions. No colored shimmer — stays in the slate/white palette. |
| **Error (page not found)**                | A single paragraph in Slate 600, specific and without apology: which page is missing and where to go instead. No 🚫 or ⚠.     |
| **Hover (link)**                          | Underline removed; no color change, no layout shift.                                                                          |
| **Hover (post row)**                      | Slate-50/25 background + Slate 300 dashed border + rounded corners.                                                           |
| **Active nav item**                       | Slate 900 (`#0f172a`) at weight 600 marks the current section — color/weight, not a chromatic accent.                         |
| **Selection**                             | `#fef4ad` background, `#160404` text.                                                                                         |
| **Code block**                            | gray-900 surface, gray-200 text, JetBrains Mono.                                                                              |

## 15. Motion & Easing

**Durations**:

| Token             | Value | Use                                            |
| ----------------- | ----- | ---------------------------------------------- |
| `motion-instant`  | 0ms   | State commits, toggle                          |
| `motion-fast`     | 150ms | Hover transitions (underline, background tint) |
| `motion-standard` | 250ms | Route transitions, small reveals               |

**Easings**:

| Token           | Curve                              | Use                           |
| --------------- | ---------------------------------- | ----------------------------- |
| `ease-standard` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Hover and two-way transitions |

**Explicitly forbidden.** No spring, no bounce, no overshoot. Motion is limited to subtle hover transitions (underline removal, faint background tint) — matching the restraint of the visual system. A bouncing element would break the quiet document feel.

**Signature motions.**

1. **Link hover.** The default underline fades out on hover over `motion-fast`. The inverse of the usual link affordance — quiet and deliberate.
2. **Post-row hover.** Background tints to slate-50/25 and a dashed Slate 300 border appears over `motion-fast`. No translate, no shadow.
3. **Reduce motion.** Under `prefers-reduced-motion: reduce`, all `motion-*` tokens collapse to `motion-instant`. The blog stays fully functional.

---

**Bootstrapped from:** user-supplied spec of **stefanzweifel.dev** (`stefan.md`). Tokens taken directly from that spec — slate text scale, white canvas, system font stack, JetBrains Mono code, top rainbow gradient bar, pale-yellow selection, weight-driven hierarchy, flat (no-shadow) surface. Fonts set to the system stack (Korean renders in the OS Hangul face) + JetBrains Mono. Dark mode derived by inverting the slate scale. §11–13 written from the blog's own facts (homepage tagline, content categories). Replaces the previous `vercel`-based DESIGN.md (backed up at `.omd/DESIGN_vercel_backup.md`; the original `claude` one remains at `DESIGN_DEPRECATED.md`).
