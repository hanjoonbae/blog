---
omd: 0.1
brand: Hanjoon Bae (기술 블로그)
bootstrapped_from: vercel
bootstrapped_at: 2026-06-24T07:57:29Z
primary_color: "#171717"
tokens:
  source: prose-derived (bootstrapped from vercel, tokens preserved, no axis delta)
  colors:
    primary: "#171717"
    black: "#000000"
    canvas: "#ffffff"
    link: "#0072f5"
    accent: "#0072f5"
    body: "#4d4d4d"
    muted: "#666666"
    placeholder: "#808080"
    border: "#ebebeb"
    surface-tint: "#fafafa"
    badge-bg: "#ebf5ff"
    badge-text: "#0068d6"
    on-primary: "#ffffff"
    focus: "hsla(212, 100%, 48%, 1)"
    dark-canvas: "#0a0a0a"
    dark-surface: "#171717"
    dark-border: "#2e2e2e"
    dark-body: "#a1a1a1"
    dark-fg: "#ededed"
    dark-link: "#3b9eff"
  typography:
    family: { sans: "Geist / Noto Sans KR fallback", mono: "Geist Mono / IBM Plex Mono fallback" }
    display-hero:
      { size: 48, weight: 600, lineHeight: 1.10, tracking: -2.4, use: "Hero, billboard impact" }
    section:
      { size: 40, weight: 600, lineHeight: 1.20, tracking: -2.4, use: "Major section titles" }
    subheading:
      { size: 32, weight: 600, lineHeight: 1.25, tracking: -1.28, use: "Sub-sections, post titles" }
    card-title: { size: 24, weight: 600, lineHeight: 1.33, tracking: -0.96, use: "Post cards" }
    body-lg: { size: 20, weight: 400, lineHeight: 1.80, use: "Intro paragraphs" }
    body: { size: 18, weight: 400, lineHeight: 1.56, use: "Standard reading text" }
    body-medium: { size: 16, weight: 500, lineHeight: 1.50, use: "Navigation, emphasized text" }
    button: { size: 14, weight: 500, lineHeight: 1.43, use: "Buttons, links" }
    caption: { size: 12, weight: 400, lineHeight: 1.33, use: "Metadata, tags" }
  spacing: { xs: 4, sm: 8, md: 12, base: 16, lg: 24, xl: 32, xxl: 48, section: 64 }
  rounded: { sm: 4, md: 6, lg: 12, full: 9999 }
  shadow:
    subtle: "rgba(0,0,0,0.04) 0px 2px 2px"
    border: "rgba(0,0,0,0.08) 0px 0px 0px 1px"
    card: "rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px, rgba(0,0,0,0.04) 0px 8px 8px -8px"
---

# Design System — Hanjoon Bae 기술 블로그

> Bootstrapped from the `vercel` (Geist) reference. Tone & tokens preserved; domain adapted
> to a personal Korean tech/engineering blog (AWS, Databricks, 논문 리뷰, 구현, 공부).
> Long-form reading on a clean, achromatic, engineered surface is the primary job.

## 1. Visual Theme & Atmosphere

This blog reads like developer infrastructure made invisible — a surface so restrained it borders on the structural. The page is overwhelmingly white (`#ffffff`) with near-black (`#171717`) text, a gallery-like emptiness where every element earns its pixel. This isn't minimalism as decoration; it's minimalism as an engineering principle. The interface is treated the way a compiler treats code — every unnecessary token is stripped away until only structure remains.

The Geist font family carries the identity. Geist Sans uses aggressive negative letter-spacing (-2.4px to -2.88px at display sizes), creating headlines that feel compressed and engineered — like code minified for production. At body sizes the tracking relaxes but the geometric precision persists. Geist Mono completes the system for code, terminal output, and technical labels. Korean body text is set in Noto Sans KR, chosen to sit calmly beside Geist without fighting its register.

What distinguishes this surface from other monochrome systems is the shadow-as-border philosophy. Instead of traditional CSS borders, depth comes from `box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.08)` — a zero-offset, zero-blur, 1px-spread shadow that draws a border-like line without the box-model implications. The whole depth system is built on layered, multi-value shadow stacks where each layer serves a specific purpose: one for the border, one for soft elevation, one for ambient depth.

**Key Characteristics:**

- Geist Sans with extreme negative letter-spacing (-2.4px to -2.88px at display) — text as compressed infrastructure
- Geist Mono for code and technical labels; Noto Sans KR for Korean body
- Shadow-as-border technique: `box-shadow 0px 0px 0px 1px` replaces traditional borders throughout
- Multi-layer shadow stacks for nuanced depth (border + elevation + ambient in single declarations)
- Near-pure white canvas with `#171717` text — not quite black, creating micro-contrast softness
- One functional accent: Link Blue (`#0072f5`) for links and the active section marker — color is never decorative
- True-dark mode (`#0a0a0a`) for the dark theme — engineered, not warmed
- Pill badges (9999px) with tinted backgrounds for tags and status

## 2. Color Palette & Roles

### Primary

- **Vercel Black** (`#171717`): Primary text, headings, dark surface backgrounds. Not pure black — the slight warmth prevents harshness.
- **Pure White** (`#ffffff`): Page background, card surfaces, button text on dark.
- **True Black** (`#000000`): Reserved for specific maximum-contrast contexts.

### Interactive

- **Link Blue** (`#0072f5`): Primary link color and the active-nav / "you are here" marker — the one functional accent.
- **Focus Blue** (`hsla(212, 100%, 48%, 1)`): Focus ring on interactive elements, for accessibility.
- **Badge Blue Bg** (`#ebf5ff`) / **Badge Blue Text** (`#0068d6`): Tinted pill-badge surface for tags.

### Neutral Scale

- **Gray 900** (`#171717`): Primary text, headings, nav text.
- **Gray 600** (`#4d4d4d`): Secondary text, description copy.
- **Gray 500** (`#666666`): Tertiary text, muted links.
- **Gray 400** (`#808080`): Placeholder text, disabled states.
- **Gray 100** (`#ebebeb`): Borders, card outlines, dividers.
- **Gray 50** (`#fafafa`): Subtle surface tint, inner shadow highlight.

### Dark Mode

- **Dark Canvas** (`#0a0a0a`): Dark-theme page background — true-dark, near-pure black.
- **Dark Surface** (`#171717`): Dark-theme cards and elevated containers.
- **Dark Border** (`#2e2e2e`): Borders and dividers on dark.
- **Dark Body** (`#a1a1a1`): Secondary text on dark.
- **Dark Foreground** (`#ededed`): Primary text / headings on dark.
- **Dark Link** (`#3b9eff`): Link Blue lightened for contrast on the dark canvas.

### Shadows & Depth

- **Border Shadow** (`rgba(0,0,0,0.08) 0px 0px 0px 1px`): The signature — replaces traditional borders.
- **Subtle Elevation** (`rgba(0,0,0,0.04) 0px 2px 2px`): Minimal lift for cards.
- **Card Stack** (`rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px, rgba(0,0,0,0.04) 0px 8px 8px -8px`): Full multi-layer card shadow.

## 3. Typography Rules

### Font Family

- **Sans**: `Geist`, with Korean fallback `Noto Sans KR`, then system sans
- **Mono**: `Geist Mono`, with fallback `IBM Plex Mono`, then `ui-monospace`
- **OpenType Features**: `"liga"` enabled on Geist text where supported.

_Note: Geist has no Korean glyphs; Korean body text resolves to Noto Sans KR. Headlines and English/code run in Geist / Geist Mono to preserve the compressed, engineered register._

### Hierarchy

| Role            | Font                 | Size           | Weight  | Line Height       | Letter Spacing    | Notes                                         |
| --------------- | -------------------- | -------------- | ------- | ----------------- | ----------------- | --------------------------------------------- |
| Display Hero    | Geist                | 48px (3.00rem) | 600     | 1.00–1.17 (tight) | -2.4px to -2.88px | Maximum compression, billboard impact         |
| Section Heading | Geist                | 40px (2.50rem) | 600     | 1.20 (tight)      | -2.4px            | Major section titles                          |
| Sub-heading     | Geist                | 32px (2.00rem) | 600     | 1.25 (tight)      | -1.28px           | Sub-sections, post titles                     |
| Card Title      | Geist                | 24px (1.50rem) | 600     | 1.33              | -0.96px           | Post cards                                    |
| Body Large      | Geist / Noto Sans KR | 20px (1.25rem) | 400     | 1.80 (relaxed)    | normal            | Intro paragraphs                              |
| Body            | Geist / Noto Sans KR | 18px (1.13rem) | 400     | 1.56              | normal            | Standard reading text                         |
| Body Medium     | Geist                | 16px (1.00rem) | 500     | 1.50              | normal            | Navigation, emphasized text                   |
| Body Semibold   | Geist                | 16px (1.00rem) | 600     | 1.50              | -0.32px           | Strong labels, active states                  |
| Button / Link   | Geist                | 14px (0.88rem) | 500     | 1.43              | normal            | Buttons, links, captions                      |
| Caption         | Geist                | 12px (0.75rem) | 400–500 | 1.33              | normal            | Metadata, tags                                |
| Mono Body       | Geist Mono           | 16px (1.00rem) | 400     | 1.50              | normal            | Code blocks                                   |
| Mono Small      | Geist Mono           | 12px (0.75rem) | 500     | 1.00 (tight)      | normal            | `text-transform: uppercase`, technical labels |

### Principles

- **Compression as identity**: Geist Sans at display sizes uses -2.4px to -2.88px letter-spacing — text that feels _minified_, like code optimized for production. The tracking progressively relaxes as size decreases: -1.28px at 32px, -0.96px at 24px, -0.32px at 16px, normal at 14px. Korean (Noto Sans KR) runs at normal tracking — negative tracking on Hangul hurts legibility.
- **Three weights, strict roles**: 400 (body/reading), 500 (UI/interactive), 600 (headings/emphasis). No bold (700) on body. Hierarchy comes from size and tracking, not weight.
- **Mono for identity**: Geist Mono in uppercase serves as the "developer console" voice — compact technical labels that connect the blog to the tools it writes about.
- **Relaxed reading body**: long-form body runs at line-height 1.56–1.80. The blog's whole job is reading; the text is dense but the leading is generous.

## 4. Component Stylings

_Tokens preserved from the `vercel` reference. The blog has fewer interactive surfaces than a product page; the relevant components are post cards, links, code blocks, tags, nav, and footer._

### Buttons / Actions

**Primary Dark** — Background `#171717`, text `#ffffff`, 6px radius, 8px 16px padding. The primary action.

**Secondary (shadow-bordered)** — Background `#ffffff`, text `#171717`, 6px radius, ring-border `rgb(235,235,235) 0px 0px 0px 1px`. The workhorse.

**Pill Badge / Tag** — Background `#ebf5ff`, text `#0068d6`, 9999px radius, 0 10px padding, 12px/500. Status badges, tags, category labels.

### Navigation

**Top Nav** — White, sticky, shadow-border bottom (`rgba(0,0,0,0.08) 0px 0px 0px 1px`). Links Geist 14px/500 `#171717`. Active link: weight 600 or Link Blue (`#0072f5`) underline — the one place color marks "you are here".

**Footer** — White or `#fafafa`, shadow-border top. Links in Gray 600 (`#4d4d4d`), captions in Gray 500.

### Data display

**Post Card** — White, no CSS border. Shadow stack `rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px`. Radius 8px. Title 24px Geist 600 (tracking -0.96px), description 16px/400 Gray 600.

**Code block** — Geist Mono on `#fafafa` (light) / `#171717` (dark), shadow-border, 6px radius, line-height 1.50. Syntax theme stays restrained; never introduces decorative warm colors into the chrome.

### Forms

**Text Input / Search** — White, 6px radius, border via shadow technique, focus `2px solid` Focus Blue ring.

### Image Treatment

- Product/diagram screenshots with `1px solid #ebebeb` border, 12px top radius.
- Prefer clean conceptual figures over decorative tech imagery.

## 5. Layout Principles

### Spacing System

- Base unit: 8px
- Scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- Section vertical spacing: generous (64–120px between major sections)

### Grid & Container

- Max content width: approximately 1200px for the page frame; comfortable reading measure (~680–760px) for body text.
- Single-column reading rhythm for posts; 2–3 column card grids for index/listing pages.
- Full-width dividers using shadow-border or `1px solid #171717`.

### Whitespace Philosophy

- **Gallery emptiness**: massive vertical padding between sections (80px+). The white space IS the design.
- **Compressed text, expanded space**: aggressive negative tracking on headlines is counterbalanced by generous surrounding whitespace. The text is dense; the space around it is vast.
- **Monochrome section rhythm**: separation comes from shadow-borders and spacing, not color variation between sections.

### Border Radius Scale

- Micro (2–4px): inline code, small spans
- Standard (6px): buttons, links, inputs
- Comfortable (8px): cards, list items
- Image (12px): featured cards, image containers (top-rounded)
- Full Pill (9999px): badges, tags, status pills

## 6. Depth & Elevation

| Level                 | Treatment                                                                  | Use                                        |
| --------------------- | -------------------------------------------------------------------------- | ------------------------------------------ |
| Flat (Level 0)        | No shadow                                                                  | Page background, text blocks               |
| Ring (Level 1)        | `rgba(0,0,0,0.08) 0px 0px 0px 1px`                                         | Shadow-as-border for most elements         |
| Light Ring (Level 1b) | `rgb(235,235,235) 0px 0px 0px 1px`                                         | Lighter ring for tabs, images              |
| Subtle Card (Level 2) | Ring + `rgba(0,0,0,0.04) 0px 2px 2px`                                      | Standard cards with minimal lift           |
| Full Card (Level 3)   | Ring + Subtle + `rgba(0,0,0,0.04) 0px 8px 8px -8px` + inner `#fafafa` ring | Featured cards, highlighted panels         |
| Focus (Accessibility) | `2px solid hsla(212, 100%, 48%, 1)` outline                                | Keyboard focus on all interactive elements |

**Shadow Philosophy**: Depth comes from multi-value shadow stacks where each layer has a distinct architectural purpose — one creates the "border" (0px spread, 1px), another adds ambient softness (2px blur), another handles depth at distance (8px blur with negative spread), and an inner ring (`#fafafa`) creates the subtle highlight that makes the card "glow" from within. Cards feel built, not floating. Shadows stay whisper-level (≤0.08 opacity).

### Decorative Depth

- No background color variation — depth comes entirely from shadow layering and border contrast.
- Section borders: shadow-border or `1px solid #171717` between major sections.

## 7. Do's and Don'ts

### Do

- Use Geist Sans with aggressive negative letter-spacing at display sizes (-2.4px to -2.88px at 48px)
- Use shadow-as-border (`0px 0px 0px 1px rgba(0,0,0,0.08)`) instead of traditional CSS borders
- Use the three-weight system: 400 (body), 500 (UI), 600 (headings)
- Keep the palette achromatic — grays from `#171717` to `#ffffff` are the system; Link Blue is the only accent
- Use `#171717` instead of `#000000` for primary text — the micro-warmth matters
- Set Korean body in Noto Sans KR at normal tracking; reserve negative tracking for Geist headlines

### Don't

- Don't use positive letter-spacing on Geist Sans — it's always negative or zero
- Don't use weight 700 (bold) on body text — 600 is the maximum, used only for headings
- Don't use traditional CSS `border` on cards — use the shadow-border technique
- Don't introduce warm colors (oranges, creams, yellows) or serif headlines — that's the rejected direction
- Don't use Link Blue decoratively — it marks links and the active section only
- Don't use heavy shadows (> 0.1 opacity) — the shadow system is whisper-level
- Don't apply negative tracking to Hangul — it hurts Korean legibility

## 8. Responsive Behavior

### Breakpoints

| Name    | Width      | Key Changes                                              |
| ------- | ---------- | -------------------------------------------------------- |
| Mobile  | <600px     | Single column, hamburger nav, tighter padding            |
| Tablet  | 600–1024px | 2-column card grids begin, expanded padding              |
| Desktop | 1024px+    | Full layout, maximum content width, full hero typography |

### Touch Targets

- Buttons use comfortable padding (8–16px vertical); minimum 44×44px tap target.
- Navigation links at 14px with adequate spacing.

### Collapsing Strategy

- Hero: 48px → scales down, maintains negative tracking proportionally
- Navigation: horizontal links + CTA → hamburger menu
- Index cards: 3-column → 2-column → single column stacked
- Section spacing: 80px+ → 48px on mobile

## 9. Agent Prompt Guide

### Quick Color Reference

- Primary / heading text: Vercel Black (`#171717`)
- Background: Pure White (`#ffffff`)
- Body text: Gray 600 (`#4d4d4d`)
- Border (shadow): `rgba(0,0,0,0.08) 0px 0px 0px 1px`
- Link / accent: Link Blue (`#0072f5`)
- Dark canvas: `#0a0a0a`

### Example Component Prompts

- "Style a post card on white, no CSS border. Shadow stack `rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px`, 8px radius. Title 24px Geist weight 600 letter-spacing -0.96px, description 16px/400 in Gray 600 (#4d4d4d)."
- "Style the article body on white with Geist headlines at weight 600 (negative tracking) and 18px Korean body in Noto Sans KR at line-height 1.56. Links in Link Blue (#0072f5)."
- "Build a dark surface on Dark Canvas (#0a0a0a) with Dark Foreground (#ededed) text and Dark Border (#2e2e2e) dividers. Links in Dark Link (#3b9eff)."

### Iteration Guide

1. Always use shadow-as-border instead of CSS border — `0px 0px 0px 1px rgba(0,0,0,0.08)` is the foundation
2. Letter-spacing scales with font size on Geist: -2.4px at 48px, -1.28px at 32px, -0.96px at 24px, normal at 14px — never on Hangul
3. Three weights only: 400 (read), 500 (interact), 600 (announce)
4. Color is functional, never decorative — Link Blue marks links and active nav only
5. Geist Mono uppercase for technical labels, Geist Sans / Noto Sans KR for everything else

---

## 10. Voice & Tone

The voice is engineer-terse, confident, and quietly clever — like a well-written README. Titles are short and declarative; copy uses precise verbs and specific nouns, no adjective stacking. Performance claims, when made, are numeric (_"빌드 시간 40% 단축"_), not adjectival (_"엄청 빠른"_). The register mirrors the compressed typography it sits in: dense, deliberate, no filler. Warmth comes from clarity and the occasional dry turn of phrase, never from decoration.

| Context                     | Tone                                                                                         |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| Post titles                 | Short, declarative, specific. Name the actual topic. No "혁신적인", "충격적인", "완벽 정리". |
| Technical explanation       | Mechanism + honest limit in one breath. State what it does and where it breaks.              |
| Error / gotcha notes        | Developer-readable: 정확한 실패 + 원인 + 다음 조치. No sanitized "오류가 발생했습니다".      |
| Documentation-style writing | Terse paragraphs, code examples above prose. No "쉽게", "간단하게" filler.                   |
| Metadata / captions         | Factual. Dates, sources, exact numbers.                                                      |
| CTA                         | Imperative, 2–3 words. "글 읽기", "코드 보기".                                               |

**Forbidden phrases.** "혁신적인", "완벽한", "충격적인", "꿀팁", "당신이 몰랐던", "엄청 빠른", "blazingly fast", "game-changer". Exclamation marks on routine headings. Emoji in technical explanations, error notes, or documentation. Performative hooks ("이 글을 끝까지 읽으면…") — state the topic and get to it.

## 11. Brand Narrative

This is the personal technical blog of **Hanjoon Bae**, a data/engineering practitioner. Its thesis is the loop in the homepage tagline: **기술을 배우고, 만들고, 기록합니다** — _learn technology, build with it, and write down what was learned._ The blog is a study log first and an audience product never: posts cover what is actively being studied (AWS SAA, Databricks DEA), implementations being built (구현), and papers being read (논문 리뷰).

The visual language — white canvas, near-black text (`#171717`), Geist Sans with aggressive negative tracking, shadow-as-border throughout — is **minimalism as an engineering principle, not a style choice**. Every element on a page goes through the same "does this justify its bytes?" discipline a well-written component goes through. Against the dev-blog defaults of warm cream reading-rooms and decorative illustration, this surface stays achromatic and structural: the writing is the content, and the chrome gets out of its way.

What this blog refuses: hype framing, clickbait titles, decorative color, and unqualified confidence about things still being learned. What it embraces: measured language, numeric claims over adjectives, a single functional accent, and the discipline of recording exactly what was understood — including the parts still uncertain.

## 12. Principles

1. **기록 over performance.** A post exists to record what was actually learned, not to perform expertise. If something isn't understood yet, the post says so.
2. **Minimalism as engineering principle.** Every element justifies its bytes — a shadow, a gradient, a decorative icon is weighed against what it adds to understanding.
3. **Mechanism over conclusion.** Explain how a thing works and where it breaks, in the same breath. A "정리" that omits the failure modes is incomplete.
4. **Color is functional, never decorative.** Link Blue marks links and the active section; the rest is achromatic. Decorative color reads as a product optimizing for engagement, not a reading surface.
5. **Three weights, no more.** 400 (read), 500 (interact), 600 (announce). Hierarchy comes from size and tracking.
6. **Claims are numeric.** "빌드 40% 단축" beats "훨씬 빨라짐". Hedging where the edge is real is a feature.
7. **Consistency is the surface.** The same shadow stack, the same mono labels, the same blue accent across every page is how the blog earns trust.

## 13. Personas

_Personas below are fictional reader archetypes informed by the blog's actual subject matter (cloud/data engineering, certification study, paper reviews), not individual people._

**Studying-for-the-same-cert reader.** A working engineer preparing for AWS SAA or Databricks DEA. Lands on a post via search while studying. Wants the actual mechanism and the gotchas, not a "한 번에 합격" hook. Trusts the post more _because_ it states caveats and cites the docs.

**Practitioner cross-referencing an implementation.** Mid-level data engineer who hit the same problem the 구현 post solves. Skims for the code and the "why this and not that" reasoning. Bounces from filler intros; stays for the precise tradeoff discussion. Reads the dashboard the way they read a terminal — eyes scanning for the non-zero value.

**Paper-review follower.** Someone tracking the same research area, reading the 논문 리뷰 posts to decide whether to read the paper themselves. Values an honest "what this paper does and doesn't show" summary over breathless framing.

**The author, six months later.** The most important reader: Hanjoon revisiting his own notes to reuse what he learned. Every post is written so future-self can reconstruct the understanding from the record — which is why mechanism, sources, and uncertainty all get written down.

## 14. States

| State                                     | Treatment                                                                                                                                                                                                                         |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Empty (index, no posts in a category)** | White canvas. One Gray 500 (`#666666`) caption at 14px: "아직 글이 없습니다." No illustration, no emoji.                                                                                                                          |
| **Empty (search, no results)**            | One Gray 500 line: "검색 결과가 없습니다." Suggestions only if genuinely useful.                                                                                                                                                  |
| **Loading (page / route transition)**     | Shadow-bordered skeleton blocks at Gray 100 (`#ebebeb`), exact final dimensions. ~1.2s shimmer in Gray 50 (`#fafafa`). Skeleton keeps the same `0px 0px 0px 1px` shadow-as-border as real content — geometry matches on paint-in. |
| **Error (page not found)**                | A single paragraph in Gray 600, specific and without apology: which page is missing and where to go instead. No 🚫 or ⚠.                                                                                                          |
| **Hover (link)**                          | Link Blue (`#0072f5`); underline appears or thickens. No layout shift.                                                                                                                                                            |
| **Active nav item**                       | Weight 600 or Link Blue underline — the one place color signals "you are here."                                                                                                                                                   |
| **Code block**                            | Restrained syntax theme; never introduces decorative warm colors into the surrounding chrome.                                                                                                                                     |
| **Skeleton**                              | Shadow-bordered Gray 100 blocks at exact final dimensions. Stays in the monochrome palette — never a different color for skeleton.                                                                                                |

## 15. Motion & Easing

**Durations**:

| Token             | Value | Use                                  |
| ----------------- | ----- | ------------------------------------ |
| `motion-instant`  | 0ms   | State commits, selection, toggle     |
| `motion-fast`     | 120ms | Hover, focus, button press           |
| `motion-standard` | 200ms | Dropdown, popover, sheet, tab switch |
| `motion-slow`     | 320ms | Section reveals                      |

**Easings**:

| Token           | Curve                              | Use                                    |
| --------------- | ---------------------------------- | -------------------------------------- |
| `ease-enter`    | `cubic-bezier(0.2, 0.6, 0.25, 1)`  | Arriving — sheets, popovers, dropdowns |
| `ease-exit`     | `cubic-bezier(0.4, 0.0, 1, 1)`     | Dismissals                             |
| `ease-standard` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Two-way transitions                    |

**Explicitly forbidden.** No spring, no bounce, no overshoot. No `cubic-bezier` with middle control values above `1.0`. Motion matches the typography — compressed, deliberate, no playful excess. A bouncing element would read as a consumer app; this is an engineering surface.

**Signature motions.**

1. **Shadow-border hover lift.** On hover over a card, the shadow stack intensifies from the base ring to include a deeper second layer over `motion-fast`. The element does not translate; the shadow grows. The card appears to press outward from the page without moving.
2. **Reduce motion.** Under `prefers-reduced-motion: reduce`, all `motion-*` tokens collapse to `motion-instant`. Hover lifts become instant. The blog stays fully functional.

---

**Bootstrapped from:** `vercel` (Geist) reference DESIGN.md — tokens preserved, no axis delta. Domain adapted to a personal Korean tech blog; fonts set to Geist + Noto Sans KR (Korean body) + Geist Mono; accent is Vercel Link Blue (`#0072f5`); dark mode is true-dark (`#0a0a0a`). §11–13 written from the blog's own facts (homepage tagline, content categories). Replaces the previous `claude`-based DESIGN.md (now `DESIGN_DEPRECATED.md`).
