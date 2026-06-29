---
sdsddddomd: 0.1
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
> blog the author likes — then evolved toward the author's own taste: **minimalism with a
> point of view.** Tokens started from that spec; domain adapted to a personal Korean
> tech/engineering blog (AWS, Databricks, 논문 리뷰, 구현, 공부).
> Content-first, single-column reading is the job of the _prose_; an animated-rainbow
> signature, a terminal motif, and hidden delight give the chrome its personality.

## 1. Visual Theme & Atmosphere

This blog is **minimalism with a personality** — not minimalism as self-denial. The reading surface stays quiet and content-first (centered single column on white `#ffffff`, ~672px wide, slate text, no boxes competing with the prose), but a single chromatic idea — an **animated rainbow gradient** — recurs as the blog's signature and is allowed to be playful where it won't disturb reading: the top bar, the site description, category cards on hover, the intro card, and a set of hidden easter eggs. The rule is not "no color, ever" but "**one accent idea, the rainbow, used deliberately — and never inside body prose.**"

The palette is restrained where it counts. A slate-gray scale carries the entire reading hierarchy: body and headings in near-black slate (`#0f172a`), section titles and links a step lighter (`#1e293b`), paragraph body and navigation lighter still (`#475569`), metadata in a neutral gray (`#6b7280`). There is no _solid_ brand color on the reading surface; chromatic energy enters only through the rainbow gradient (always the same six-stop spectrum) and a pale-yellow text-selection highlight (`#fef4ad`). The rainbow is the personality; the slate scale is the discipline.

What gives the prose its character is the weight-driven hierarchy. Section headings (h1–h3) and body share a 16px size; the difference between a name, a section title, and a paragraph is carried by font-weight (500 for headings, 400 for body) and color, not by a type-scale jump. Display moments — the homepage post title (26px), page titles (28px) — are allowed to break this and go bolder, because they are framing, not reading. Inside an article, the surface reads quiet and even, like a well-set document.

The blog also carries a quiet **terminal/maker motif**: the site title is set in JetBrains Mono with wide tracking, code blocks wear macOS traffic-light dots, and the about page renders as a terminal session. It signals "this is an engineer's log" without shouting.

**Key Characteristics:**

- Centered single column, ~672px reading measure on a pure white canvas — prose stays minimal
- Slate-gray scale carries the full reading hierarchy — no _solid_ brand color in body prose
- One signature idea: an **animated rainbow gradient** (six-stop spectrum, slow `rainbow-shift`) — top bar, site description, category-card hover, intro card, easter eggs
- Display titles (homepage 26px, page 28px) may go bolder/larger — they frame, not read
- System font stack for sans; JetBrains Mono for code, the site title, and the terminal motif
- Weight-and-color-driven hierarchy in prose — h1–h3 share a 16px size, differentiated by weight
- Links underlined by default, underline removed on hover — the inverse of the usual convention
- Pale-yellow selection highlight (`#fef4ad` on `#160404`) as a small warm detail
- Hidden delight is on-brand: Konami code, a "rainbow" hotword, a console greeting, a bossa-nova BGM toggle — invisible until sought, so the default surface stays calm

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

### Accent — Animated Rainbow Gradient (the signature)

The blog's one chromatic idea, used in several places but always the **same six-stop spectrum**:

```text
#ff595e → #ffca3a → #8ac926 → #1982c4 → #6a4c93 → #ff595e
```

It is animated by a shared `rainbow-shift` keyframe (background-position sweep), so the spectrum drifts slowly rather than sitting static. Where it appears:

- **Top bar**: a 3px-tall gradient bar fixed at the top of every non-post page, softened with `blur(0.5px)` for a gentle glow. Slowly drifting (`4s linear infinite`).
- **Site description** (nav): the tagline rendered as gradient-clipped text.
- **Category cards** (homepage): a gradient border + gradient label that fade/animate **in on hover** (paused until hover), reverting on leave.
- **Intro card** (homepage): a gradient fill revealed on hover (the white `::before` mask fades), text flipping to white.
- **Easter eggs**: rainbow heading text on the "rainbow" hotword; full confetti + flash + hue-rotate on the Konami code.

Rules: it is the **only** accent — do not introduce a second brand color. Keep all six stops and their order identical everywhere (don't recolor or reorder). Never run the gradient _through body prose_ — it belongs to chrome, framing, and deliberate delight, not to paragraphs or links inside an article.

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

| Element                    | Size | Weight | Line Height | Color                   |
| -------------------------- | ---- | ------ | ----------- | ----------------------- |
| `<body>`                 | 16px | 400    | 1.5         | Slate 900 (`#0f172a`) |
| `<h1>` (name / title)    | 16px | 500    | 1.5         | Slate 900               |
| `<h2>` (role / subtitle) | 16px | 500    | 1.5         | Slate 600 (`#475569`) |
| `<h3>` (section heading) | 16px | 500    | 1.5         | Slate 900               |
| `<p>` (paragraph)        | 16px | 400    | 1.75        | Slate 600–700          |
| Navigation link            | 14px | 500    | —          | Slate 600               |
| Date / meta                | 16px | 400    | —          | Gray 500 (`#6b7280`)  |
| Project / post name        | 16px | 600    | —          | Slate 800 (`#1e293b`) |
| Project / post description | 14px | 400    | —          | Slate 600               |

### Display Type (framing, not reading)

A few title moments are deliberately allowed to break the even-hierarchy rule, because they frame the page rather than belong to a reading flow:

| Element                       | Size | Weight | Notes                                                        |
| ----------------------------- | ---- | ------ | ----------------------------------------------------------- |
| Site title (nav logo)         | 22px | 700    | **JetBrains Mono**, letter-spacing 0.12em — terminal motif  |
| Post title (`.post-heading`)  | 26px | 700    | The homepage/article headline                               |
| Page title (`.page-title h1`) | 28px | 700    | Section index pages, letter-spacing 0.1em                   |

These are the only places size carries hierarchy. Everywhere inside prose, the even 16px / weight rule below still holds.

### Principles

- **Weight, not size, makes hierarchy (in prose)**: inside reading, section headings (h1–h3) and body share a 16px size. The distinction between a heading and a paragraph is carried by weight (500 vs 400) and color, not by a type-scale jump. The surface reads even and quiet. (Display titles above are the deliberate exception.)
- **Generous paragraph leading**: body paragraphs run at line-height 1.75; UI/headings at 1.5. Long-form Korean reading benefits from the extra leading.
- **System stack as a feature**: no font fetch for body, native rendering on every platform. Fast, familiar, unbranded — the type gets out of the content's way.
- **Mono as code + identity**: JetBrains Mono is for code blocks and inline code — and, as a deliberate brand signal, the site title and the about-page terminal. Never for body paragraphs.

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

| Level                | Treatment                                            | Use                                                  |
| -------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| Flat (Level 0)       | No shadow, no border                                 | Page background, body text, headings — the default   |
| Hover tint (Level 1) | Slate-50/25 background + Slate 300 dashed border     | Post/project rows on hover                           |
| Code surface         | `#0d1117` fill + 1px `#30363d` border + soft shadow  | Code blocks (the one elevated, "app-window" surface) |

**Shadow Philosophy**: the reading surface is flat — no drop shadows on text, cards, or hover rows; depth and grouping come from whitespace and the occasional dashed hover border. The **one** sanctioned exception is the code block, which is treated as a small floating "terminal window": a dark `#0d1117` fill, a 1px `#30363d` border, macOS traffic-light dots, and a soft `0 4px 24px rgba(0,0,0,0.18)` shadow. That single elevated element is part of the maker motif. Do not add shadows anywhere else; flatness stays the identity for everything that is read.

## 7. Do's and Don'ts

### Do

- Keep a single centered column at ~672px reading measure
- Use the slate scale (`#0f172a` → `#475569` → `#6b7280`) for all _prose_ text hierarchy
- Make prose hierarchy with font-weight and color, not big size jumps (h1–h3 share ~16px)
- Let the **display titles** (site title 22px mono, post title 26px, page title 28px) go bolder — they frame, not read
- Use the system font stack for sans; JetBrains Mono for code, the site title, and the terminal motif
- Underline links by default and remove the underline on hover
- Use the **animated rainbow** as the signature — top bar, site description, category-card / intro-card hover, easter eggs — always the same six stops in the same order
- Reach for tasteful, contained delight (the easter eggs, BGM toggle, hero grayscale→color hover) — it's on-brand _because_ it's hidden or opt-in
- Treat the code block as the one elevated "terminal window" (dark fill, traffic-light dots, soft shadow)
- Use the pale-yellow selection highlight (`#fef4ad` / `#160404`)
- Use dashed hover borders + faint tint for interactive reading rows — no shadows on those

### Don't

- Don't run the rainbow (or any color) **through body prose** — links and paragraphs inside an article stay slate; the rainbow is for chrome and framing
- Don't introduce a _second_ accent color or recolor/reorder the six rainbow stops — one spectrum, used everywhere
- Don't add drop shadows to text, cards, or hover rows — the **only** shadow is on the code block
- Don't create large heading/body size contrast _inside prose_ — weight carries the hierarchy there
- Don't use serif or a fetched web body font — the system stack is deliberate
- Don't widen the reading column beyond a comfortable single-column measure
- Don't add warm cream backgrounds or a third palette
- Don't keep link underlines on hover — hover removes them
- Don't make the entrance/animation interrupt or block reading — delight must yield to content, honor `prefers-reduced-motion`, and never gate the post behind a splash

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
- Code surface: `#0d1117` fill / `#e6edf3` text, 1px `#30363d` border + traffic-light dots
- Accent: the animated six-stop rainbow (`#ff595e → #ffca3a → #8ac926 → #1982c4 → #6a4c93 → #ff595e`) — top bar, site description, hover states, easter eggs. No second solid brand color; never inside body prose.

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

The visual language starts from a minimalist personal blog the author admires (stefanzweifel.dev) — a single centered column on white, a slate-gray scale carrying the reading hierarchy, the system font stack — and then adds the author's own personality on top: an **animated rainbow** as the recurring signature, a JetBrains-Mono terminal motif, and a layer of hidden delight (a Konami party, a "rainbow" hotword, a console greeting, a bossa-nova toggle). It is content-first by construction but not personality-free: this is **minimalism with a point of view**, not minimalism as erasure. The chrome stays quiet so the writing leads; the personality lives in the edges — the masthead, the hover states, the easter eggs — where it can delight without getting between the reader and the prose.

What this blog refuses: hype framing, clickbait titles, color _inside the reading flow_, shadowed boxes around text, and unqualified confidence about things still being learned. What it embraces: a quiet document-like reading surface, weight-driven hierarchy in prose, measured language, the discipline of recording exactly what was understood (including the uncertain parts) — and one well-defined streak of playfulness (the rainbow signature and the hidden delights) that makes the surface feel like a person's, not a template's.

## 12. Principles

1. **기록 over performance.** A post exists to record what was actually learned, not to perform expertise. If something isn't understood yet, the post says so.
2. **Minimalism with a point of view.** The reading surface stays calm — white column, slate text, no boxes around prose — but the blog is allowed a personality at the edges: the rainbow signature, the terminal motif, and hidden delight. Minimal where it's read; characterful where it's framed.
3. **Mechanism over conclusion.** Explain how a thing works and where it breaks, in the same breath. A "정리" that omits the failure modes is incomplete.
4. **Hierarchy by weight, not noise (in prose).** Inside reading, headings and body share a size; weight and color carry the structure. Display titles may go bigger — they frame, not read.
5. **One accent idea, used deliberately.** The animated rainbow is the single chromatic signature — top bar, site description, hover states, easter eggs — always the same six stops. It never bleeds into body prose, and no second color joins it.
6. **Delight is opt-in, never in the way.** The easter eggs and BGM exist to make the surface feel like a person's; they stay hidden or optional, respect reduced-motion, and never block reading or gate content behind a splash.
7. **Claims are numeric.** "빌드 40% 단축" beats "훨씬 빨라짐". Hedging where the edge is real is a feature.
8. **The system font is a feature.** Native body rendering, no fetch, gets out of the content's way; mono is reserved for code and the terminal identity.

## 13. Personas

_Personas below are fictional reader archetypes informed by the blog's actual subject matter (cloud/data engineering, certification study, paper reviews), not individual people._

**Studying-for-the-same-cert reader.** A working engineer preparing for AWS SAA or Databricks DEA. Lands on a post via search while studying. Wants the actual mechanism and the gotchas, not a "한 번에 합격" hook. Trusts the post more _because_ it states caveats and cites the docs.

**Practitioner cross-referencing an implementation.** Mid-level data engineer who hit the same problem the 구현 post solves. Skims for the code and the "why this and not that" reasoning. Bounces from filler intros; stays for the precise tradeoff discussion.

**Paper-review follower.** Someone tracking the same research area, reading the 논문 리뷰 posts to decide whether to read the paper themselves. Values an honest "what this paper does and doesn't show" summary over breathless framing.

**The author, six months later.** The most important reader: Hanjoon revisiting his own notes to reuse what he learned. Every post is written so future-self can reconstruct the understanding from the record — which is why mechanism, sources, and uncertainty all get written down.

## 14. States

| State                                           | Treatment                                                                                                                      |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Empty (index, no posts in a category)** | White canvas. One Gray 500 (`#6b7280`) line at 16px: "아직 글이 없습니다." No illustration, no emoji.                        |
| **Empty (search, no results)**            | One Gray 500 line: "검색 결과가 없습니다." Suggestions only if genuinely useful.                                               |
| **Loading (page / route transition)**     | White background with faint slate skeleton blocks at final dimensions. No colored shimmer — stays in the slate/white palette. |
| **Error (page not found)**                | A single paragraph in Slate 600, specific and without apology: which page is missing and where to go instead. No 🚫 or ⚠.     |
| **Hover (link)**                          | Underline removed; no color change, no layout shift.                                                                           |
| **Hover (post row)**                      | Slate-50/25 background + Slate 300 dashed border + rounded corners.                                                            |
| **Active nav item**                       | Slate 900 (`#0f172a`) at weight 600 marks the current section — color/weight, not a chromatic accent.                       |
| **Selection**                             | `#fef4ad` background, `#160404` text.                                                                                      |
| **Code block**                            | gray-900 surface, gray-200 text, JetBrains Mono.                                                                               |

## 15. Motion & Easing

Motion has **two registers**. In and around _reading_, it is whisper-quiet (hover fades, tint changes). Away from reading — chrome, signature, opt-in delight — it is allowed to be alive (the slow rainbow drift) or even exuberant (the easter-egg party). Keep the two registers separate: a paragraph never bounces; a Konami code is allowed to throw confetti.

**Durations**:

| Token               | Value      | Use                                            |
| ------------------- | ---------- | ---------------------------------------------- |
| `motion-instant`  | 0ms        | State commits, toggle                          |
| `motion-fast`     | 150ms      | Hover transitions (underline, background tint) |
| `motion-standard` | 250ms      | Route transitions, hover reveals (cards)       |
| `motion-ambient`  | 2s–4s loop | The rainbow drift; BGM equalizer bars          |
| `motion-delight`  | ~0.5s–5.5s | Easter-egg party (one-shot, opt-in)            |

**Easings**:

| Token             | Curve                                | Use                           |
| ----------------- | ------------------------------------ | ----------------------------- |
| `ease-standard` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Hover and two-way transitions |

**Constraints.** No spring/bounce/overshoot on _reading_ elements — paragraphs, headings, links, and post rows stay still and quiet. The grayscale→color hero transition (`0.7s ease`) and the slow rainbow drift are the ambient exceptions; the easter eggs are the opt-in ones. Nothing that animates may shift the layout of text or block reading.

**Signature motions.**

1. **Link hover.** The default underline fades out on hover over `motion-fast`. The inverse of the usual link affordance — quiet and deliberate.
2. **Post-row hover.** Background tints to slate-50/25 and a dashed Slate 300 border appears over `motion-fast`. No translate, no shadow.
3. **Rainbow drift (ambient).** The six-stop gradient sweeps its background-position on a slow `rainbow-shift` loop (`~2.5s–4s linear infinite`) wherever the signature appears — top bar, site description, category-card / intro-card hover.
4. **Hero reveal.** The masthead photo sits in grayscale and warms to full color over `0.7s ease` on hover — a small, calm payoff.
5. **Delight (opt-in).** The "rainbow" hotword tints headings; the Konami code runs a one-shot party (confetti fall, gradient flash, gentle main wobble, hue-rotate) for ~5.5s, then fully reverts. Hidden by default — it never fires on normal use.
6. **Reduce motion.** Under `prefers-reduced-motion: reduce`, all `motion-*` tokens collapse to `motion-instant`, the rainbow drift and easter-egg animations are suppressed (the party falls back to a brief static rainbow), and the BGM bars hold a static height. The blog stays fully functional and calm.

---

**Bootstrapped from:** user-supplied spec of **stefanzweifel.dev** (`stefan.md`). Tokens taken directly from that spec — slate text scale, white canvas, system font stack, JetBrains Mono code, top rainbow gradient bar, pale-yellow selection, weight-driven hierarchy, flat (no-shadow) surface. Fonts set to the system stack (Korean renders in the OS Hangul face) + JetBrains Mono. Dark mode derived by inverting the slate scale. §11–13 written from the blog's own facts (homepage tagline, content categories). Replaces the previous `vercel`-based DESIGN.md (backed up at `.omd/DESIGN_vercel_backup.md`; the original `claude` one remains at `DESIGN_DEPRECATED.md`).
