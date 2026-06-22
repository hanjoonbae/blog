---
omd: 0.1
brand: Hanjoon Bae (기술 블로그)
bootstrapped_from: claude
bootstrapped_at: 2026-06-22T08:46:23Z
primary_color: "#c96442"
tokens:
  source: prose-derived (bootstrapped from claude, tokens preserved, no axis delta)
  colors:
    primary: "#c96442"
    primary-hover: "#d97757"
    brand: "#c96442"
    canvas: "#f5f4ed"
    foreground: "#141413"
    muted: "#87867f"
    on-primary: "#faf9f5"
    surface: "#faf9f5"
    surface-sand: "#e8e6dc"
    surface-dark: "#30302e"
    body: "#5e5d59"
    label: "#4d4c48"
    on-dark: "#b0aea5"
    hairline: "#f0eee6"
    hairline-strong: "#e8e6dc"
    accent-coral: "#d97757"
    error: "#b53333"
    focus: "#3898ec"
    ring: "#d1cfc5"
    foreground-deep: "#0f0f0e"
    muted-strong: "#73726c"
    accent-rose: "#c46686"
  typography:
    family:
      {
        sans: "Anthropic Sans / system-ui fallback",
        serif: "Anthropic Serif / Georgia fallback",
        mono: "Anthropic Mono / monospace fallback",
      }
    display-hero:
      {
        size: 64,
        weight: 500,
        lineHeight: 1.10,
        use: "Hero headlines, book-title presence (serif)",
      }
    section: { size: 52, weight: 500, lineHeight: 1.20, use: "Feature section anchors (serif)" }
    subheading-lg:
      { size: 36, weight: 500, lineHeight: 1.30, use: "Secondary section markers (serif)" }
    subheading: { size: 32, weight: 500, lineHeight: 1.10, use: "Card titles, post titles (serif)" }
    subheading-sm:
      { size: 25, weight: 500, lineHeight: 1.20, use: "Smaller section titles (serif)" }
    feature-title: { size: 21, weight: 500, lineHeight: 1.20, use: "Small headings (serif)" }
    body-serif: { size: 17, weight: 400, lineHeight: 1.60, use: "Editorial serif body passages" }
    body-lg: { size: 20, weight: 400, lineHeight: 1.60, use: "Intro paragraphs (sans)" }
    body-nav: { size: 17, weight: 400, lineHeight: 1.60, use: "Navigation links, UI text (sans)" }
    body: { size: 16, weight: 400, lineHeight: 1.60, use: "Standard body, button text (sans)" }
    body-sm: { size: 15, weight: 400, lineHeight: 1.60, use: "Compact body text (sans)" }
    caption: { size: 14, weight: 400, lineHeight: 1.43, use: "Metadata, descriptions (sans)" }
    label:
      {
        size: 12,
        weight: 500,
        lineHeight: 1.25,
        tracking: 0.12,
        use: "Badges, small labels (sans)",
      }
    overline:
      {
        size: 10,
        weight: 400,
        lineHeight: 1.60,
        tracking: 0.5,
        use: "Uppercase overline labels (sans)",
      }
    code:
      {
        size: 15,
        weight: 400,
        lineHeight: 1.60,
        tracking: -0.32,
        use: "Inline code, terminal (mono)",
      }
  spacing: { xs: 4, sm: 8, md: 16, base: 16, lg: 24, xl: 32, xxl: 48, section: 80 }
  rounded: { sm: 4, md: 8, lg: 16, xl: 32, full: 9999 }
  shadow:
    whisper: "rgba(0,0,0,0.05) 0px 4px 24px"
    ring: "0px 0px 0px 1px #d1cfc5"
---

# Design System — Hanjoon Bae 기술 블로그

> Bootstrapped from the `claude` (Anthropic) reference. Tone & tokens preserved; domain
> adapted to a personal Korean tech/engineering blog (AWS, Databricks, 논문 리뷰, 구현, 공부).
> Long-form reading is the primary job of every surface.

## 1. Visual Theme & Atmosphere

This blog is a reading room reimagined as a website — warm, unhurried, and quietly studious. The entire experience sits on a parchment-toned canvas (`#f5f4ed`) that deliberately evokes the feeling of high-quality paper rather than a digital surface. Where most dev blogs lean into cold, terminal-dark or clinical-white aesthetics, this design radiates human warmth, as if the notes themselves were typeset with care.

The signature move is a medium-weight serif for every headline — generous proportions that give a post title the gravitas of a book chapter. Combined with a muted, warm-toned palette and terracotta (`#c96442`) reserved for the single highest-signal accent, the visual language says "considered study notes" rather than "shipped product". The serif headlines breathe at tight-but-comfortable line-heights (1.10–1.30), creating a cadence that feels more like reading an essay than scanning a feed.

What makes the system distinctive is its warm neutral palette. Every gray has a yellow-brown undertone (`#5e5d59`, `#87867f`, `#4d4c48`) — there are no cool blue-grays anywhere. Borders are cream-tinted (`#f0eee6`, `#e8e6dc`), shadows use warm transparent blacks, and even the darkest surfaces (`#141413`, `#30302e`) carry a barely perceptible olive warmth. This chromatic consistency creates a space that feels lived-in and trustworthy.

**Key Characteristics:**

- Warm parchment canvas (`#f5f4ed`) evoking premium paper, not screens
- Serif for headlines, Sans for UI, Mono for code — three clearly separated roles
- Terracotta accent (`#c96442`) — warm, earthy, deliberately un-tech
- Exclusively warm-toned neutrals — every gray has a yellow-brown undertone
- Editorial pacing with generous section spacing and serif-driven hierarchy
- Ring-based shadow system (`0px 0px 0px 1px`) creating border-like depth without visible borders
- Long-form readability prioritized over feed density

## 2. Color Palette & Roles

### Primary

- **Warm Near Black** (`#141413`): The primary text color and dark-mode surface — not pure black but a warm, almost olive-tinted dark that's gentler on the eyes.
- **Terracotta Brand** (`#c96442`): The core accent — a burnt orange-brown used for primary links, the highest-signal brand moments, and the active accent. Deliberately earthy and un-tech.
- **Coral Accent** (`#d97757`): A lighter, warmer variant of the brand color used for text accents and links on dark surfaces.
- **Foreground Deep** (`#0f0f0e`): The deepest near-black, for maximum-contrast dark fills.
- **Accent Rose** (`#c46686`): A muted dusty-rose — a rare chromatic surface that sits beside Terracotta in the warm family without competing for accent signal.

### Secondary & Accent

- **Error Crimson** (`#b53333`): A deep, warm red for error states — serious without being alarming.
- **Focus Blue** (`#3898ec`): Standard blue for input focus rings — the only cool color in the system, used purely for accessibility.

### Surface & Background

- **Parchment** (`#f5f4ed`): The primary page background — a warm cream with a yellow-green tint. The emotional foundation of the design.
- **Ivory** (`#faf9f5`): The lightest surface — cards and elevated containers on Parchment. Subtle layering.
- **Pure White** (`#ffffff`): Reserved for specific surfaces and maximum-contrast elements.
- **Warm Sand** (`#e8e6dc`): Prominent interactive surfaces — a noticeably warm light gray.
- **Dark Surface** (`#30302e`): Dark-mode containers and elevated dark elements — warm charcoal.
- **Deep Dark** (`#141413`): Dark-mode page background and primary dark surface.

### Neutrals & Text

- **Charcoal Warm** (`#4d4c48`): The go-to dark-on-light text on warm surfaces.
- **Olive Gray** (`#5e5d59`): Secondary body text — a distinctly warm medium-dark gray.
- **Stone Gray** (`#87867f`): Tertiary text, footnotes, de-emphasized metadata.
- **Muted Strong** (`#73726c`): A slightly deeper warm gray for muted-but-legible interactive text.
- **Warm Silver** (`#b0aea5`): Text on dark surfaces — a warm, parchment-tinted light gray.

### Semantic & Border

- **Border Cream** (`#f0eee6`): Standard light-mode border — barely visible warm cream.
- **Border Warm** (`#e8e6dc`): Prominent borders, section dividers.
- **Border Dark** (`#30302e`): Standard border on dark surfaces — maintains the warm tone.
- **Ring Warm** (`#d1cfc5`): Shadow ring color for hover/focus states.

### Gradient System

- The system is **gradient-free** in the traditional sense. Depth and richness come from the interplay of warm surface tones and light/dark section alternation. The warm palette itself creates a "gradient" effect as the eye moves through cream → sand → stone → charcoal → black.

## 3. Typography Rules

### Font Family

- **Headline**: serif (`Anthropic Serif`, fallback `Georgia`) — for post titles and section headers
- **Body / UI**: sans (`Anthropic Sans`, fallback `system-ui` / Pretendard for Korean)
- **Code**: mono (`Anthropic Mono`, fallback `IBM Plex Mono` / monospace)

_Note: Anthropic's custom faces are proprietary. For this blog, a serif (Georgia / Noto Serif KR), a sans (Pretendard / system-ui), and a mono (IBM Plex Mono) substitute while preserving the serif-headline / sans-body / mono-code split._

### Hierarchy

| Role              | Font  | Size            | Weight  | Line Height    | Letter Spacing | Notes                               |
| ----------------- | ----- | --------------- | ------- | -------------- | -------------- | ----------------------------------- |
| Display / Hero    | Serif | 64px (4rem)     | 500     | 1.10 (tight)   | normal         | Maximum impact, book-title presence |
| Section Heading   | Serif | 52px (3.25rem)  | 500     | 1.20 (tight)   | normal         | Major section anchors               |
| Sub-heading Large | Serif | 36px (~2.3rem)  | 500     | 1.30           | normal         | Secondary section markers           |
| Sub-heading       | Serif | 32px (2rem)     | 500     | 1.10 (tight)   | normal         | Card titles, post titles            |
| Sub-heading Small | Serif | 25px (~1.6rem)  | 500     | 1.20           | normal         | Smaller section titles              |
| Feature Title     | Serif | 20.8px (1.3rem) | 500     | 1.20           | normal         | Small headings                      |
| Body Serif        | Serif | 17px (1.06rem)  | 400     | 1.60 (relaxed) | normal         | Editorial serif passages            |
| Body Large        | Sans  | 20px (1.25rem)  | 400     | 1.60 (relaxed) | normal         | Intro paragraphs                    |
| Body / Nav        | Sans  | 17px (1.06rem)  | 400–500 | 1.00–1.60      | normal         | Navigation, UI text                 |
| Body Standard     | Sans  | 16px (1rem)     | 400–500 | 1.25–1.60      | normal         | Standard body, button text          |
| Body Small        | Sans  | 15px (0.94rem)  | 400–500 | 1.00–1.60      | normal         | Compact body text                   |
| Caption           | Sans  | 14px (0.88rem)  | 400     | 1.43           | normal         | Metadata, descriptions              |
| Label             | Sans  | 12px (0.75rem)  | 400–500 | 1.25–1.60      | 0.12px         | Badges, small labels                |
| Overline          | Sans  | 10px (0.63rem)  | 400     | 1.60           | 0.5px          | Uppercase overline labels           |
| Code              | Mono  | 15px (0.94rem)  | 400     | 1.60           | -0.32px        | Inline code, terminal               |

### Principles

- **Serif for authority, sans for utility**: The serif carries all headline content at medium weight (500), giving every post title the gravitas of a published piece. The sans handles all functional UI text — buttons, labels, navigation — with quiet efficiency.
- **Single weight for serifs**: All serif headings use weight 500 — no bold, no light. One consistent "voice" across all headline sizes.
- **Relaxed body line-height**: Most body text uses 1.60 line-height — significantly more generous than typical tech sites. A reading experience closer to a book than a dashboard. This matters most: the blog's whole job is long-form reading.
- **Tight-but-not-compressed headings**: Line-heights of 1.10–1.30 for headings are tight but never claustrophobic. Serif letterforms need breathing room.
- **Micro letter-spacing on labels**: Small sans text (12px and below) uses deliberate letter-spacing (0.12px–0.5px) for readability at tiny sizes.

## 4. Component Stylings

_Tokens preserved from the `claude` reference. The blog has fewer interactive surfaces than a product page, so the relevant components are post cards, links, code blocks, tags, nav, and footer. Component grouping retained for consistency._

### Actions

**Primary link / accent** — Terracotta Brand (`#c96442`) text or fill on Ivory; the only chromatic accent, reserved for the highest-signal moments (active nav item, primary action, hovered links resolving to coral `#d97757`).

**Dark CTA** — Foreground Deep (`#0f0f0e`) fill, Ivory (`#faf9f5`) text, 8px radius, 8px 16px padding. The default action, dark-on-warm — not terracotta.

**Secondary** — Warm Sand (`#e8e6dc`) fill, Charcoal Warm (`#4d4c48`) text, 8px radius, ring shadow (`0px 0px 0px 1px #d1cfc5`). The workhorse, warm and unassuming.

### Navigation

**Top Nav / Header** — Ivory (`#faf9f5`), serif wordmark in Foreground Deep (`#0f0f0e`), links 16–20px. Hover: text shifts toward foreground-primary, no decoration.

**Footer** — Warm Near Black (`#141413`) full-bleed dark band, Ivory headings, Warm Silver (`#b0aea5`) links at 12px. The closing dark "chapter" of the page.

### Data display

**Post Card** — Ivory (`#faf9f5`) / Pure White, 1px solid Border Cream (`#f0eee6`), radius 8–16px, whisper shadow (`rgba(0,0,0,0.05) 0px 4px 24px`). Title in serif 25px/500, description in Olive Gray (`#5e5d59`) 15–16px sans.

**Tag / Badge** — Warm Sand (`#e8e6dc`) fill, Charcoal Warm text, label typography (12px/500, 0.12px tracking), highly rounded.

**Code block** — Mono, on a warm-tinted dark or sand surface, 8–12px radius, generous 1.60 line-height. Syntax highlighting stays within warm/neutral tones where possible; never let it introduce cool blue-grays into the page chrome.

### Forms

**Text Input / Search** — Pure White, Warm Near Black text, 1px solid Ring Warm (`#d1cfc5`), 12px radius. Focus: ring with Focus Blue (`#3898ec`) — the only cool color moment in the system.

### Image Treatment

- Generous radius on media (16–32px); diagrams and screenshots contrast the warm canvas.
- Prefer clean, conceptual figures over decorative tech imagery.

## 5. Layout Principles

### Spacing System

- Base unit: 8px
- Scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 80px
- Card internal padding: approximately 24–32px
- Section vertical spacing: generous (80–120px between major sections)

### Grid & Container

- Max reading-column width: comfortable measure (~680–760px for body text), wider container (~1100–1200px) for the page frame
- Single-column reading rhythm for posts; 2–3 column card grids for index/listing pages
- Full-width dark sections may break the container for emphasis

### Whitespace Philosophy

- **Editorial pacing**: Each section breathes like a magazine spread — generous margins create natural reading pauses.
- **Serif-driven rhythm**: Serif headings establish a literary cadence that demands more whitespace than sans-serif designs.
- **Content island approach**: Light and dark sections create distinct "rooms" for each message.

### Border Radius Scale

- Sharp (4px): minimal inline elements
- Comfortably rounded (8px): standard buttons, cards, containers
- Generously rounded (12px): primary buttons, input fields, nav elements
- Very rounded (16px): featured containers, media
- Maximum rounded (24–32px): hero containers, large cards

## 6. Depth & Elevation

| Level               | Treatment                                                 | Use                                      |
| ------------------- | --------------------------------------------------------- | ---------------------------------------- |
| Flat (Level 0)      | No shadow, no border                                      | Parchment background, inline text        |
| Contained (Level 1) | `1px solid #f0eee6` (light) or `1px solid #30302e` (dark) | Standard cards, sections                 |
| Ring (Level 2)      | `0px 0px 0px 1px` ring shadows using warm grays           | Interactive cards, buttons, hover states |
| Whisper (Level 3)   | `rgba(0,0,0,0.05) 0px 4px 24px`                           | Elevated cards, screenshots              |
| Inset (Level 4)     | `inset 0px 0px 0px 1px` at 15% opacity                    | Active/pressed states                    |

**Shadow Philosophy**: Depth comes from **warm-toned ring shadows** rather than traditional drop shadows. The signature `0px 0px 0px 1px` pattern creates a border-like halo softer than an actual border. When drop shadows appear, they're extremely soft (0.05 opacity, 24px blur) — barely visible lifts that suggest floating rather than casting.

### Decorative Depth

- **Light/Dark alternation**: The most dramatic depth effect comes from alternating Parchment (`#f5f4ed`) and Near Black (`#141413`) sections.
- **Warm ring halos**: Interactions use ring shadows that match the warm palette — never cool-toned or generic gray.

## 7. Do's and Don'ts

### Do

- Use Parchment (`#f5f4ed`) as the primary light background — the warm cream tone IS the personality
- Use the serif at weight 500 for all headlines — the single-weight consistency is intentional
- Use Terracotta Brand (`#c96442`) only for primary links and highest-signal accents
- Keep all neutrals warm-toned — every gray should have a yellow-brown undertone
- Use ring shadows (`0px 0px 0px 1px`) for interactive states instead of drop shadows
- Maintain the serif/sans hierarchy — serif for content headlines, sans for UI
- Use generous body line-height (1.60) for a literary reading experience
- Apply generous border-radius (12–32px) for a soft, approachable feel

### Don't

- Don't use cool blue-grays anywhere — the palette is exclusively warm-toned
- Don't use bold (700+) weight on serif headlines — weight 500 is the ceiling
- Don't introduce saturated colors beyond Terracotta — the palette is deliberately muted
- Don't use sharp corners (< 6px radius) on buttons or cards — softness is core to the identity
- Don't apply heavy drop shadows — depth comes from ring shadows and background shifts
- Don't use pure white (`#ffffff`) as a page background — Parchment / Ivory are always warmer
- Don't reduce body line-height below 1.40 — generous spacing supports the editorial personality
- Don't use monospace for non-code content — mono is strictly for code

## 8. Responsive Behavior

### Breakpoints

| Name    | Width     | Key Changes                                               |
| ------- | --------- | --------------------------------------------------------- |
| Mobile  | <640px    | Single column, hamburger nav, reduced heading sizes       |
| Tablet  | 768–991px | 2-column grids begin, condensed nav                       |
| Desktop | 992px+    | Full layout, expanded nav, maximum hero typography (64px) |

### Touch Targets

- Minimum recommended: 44×44px; nav links adequately spaced for thumb navigation.

### Collapsing Strategy

- **Navigation**: full horizontal nav → hamburger on mobile
- **Index/listing**: multi-column card grid → stacked single column
- **Hero text**: 64px → 36px → ~25px progressive scaling
- **Section padding**: reduces proportionally but maintains editorial rhythm

## 9. Agent Prompt Guide

### Quick Color Reference

- Accent: "Terracotta Brand (#c96442)"
- Page Background: "Parchment (#f5f4ed)"
- Card Surface: "Ivory (#faf9f5)"
- Primary Text: "Warm Near Black (#141413)"
- Secondary Text: "Olive Gray (#5e5d59)"
- Tertiary Text: "Stone Gray (#87867f)"
- Borders (light): "Border Cream (#f0eee6)"
- Dark Surface: "Dark Surface (#30302e)"

### Example Component Prompts

- "Style a post card on Ivory (#faf9f5) with a 1px solid Border Cream (#f0eee6) border and 8px radius. Title in serif at 25px weight 500, description in Olive Gray (#5e5d59) at 15px sans. Add a whisper shadow (rgba(0,0,0,0.05) 0px 4px 24px)."
- "Style the article body on Parchment (#f5f4ed) with serif headings at weight 500 and 16–17px body at line-height 1.60. Links in Terracotta Brand (#c96442), hover to Coral (#d97757)."
- "Build a dark footer band on Warm Near Black (#141413) with Ivory (#faf9f5) headings and Warm Silver (#b0aea5) links."

### Iteration Guide

1. Reference specific color names — "use Olive Gray (#5e5d59)" not "make it gray"
2. Always specify warm-toned variants — no cool grays
3. Describe serif vs sans usage explicitly
4. For shadows, use "ring shadow (0px 0px 0px 1px)" or "whisper shadow" — never generic "drop shadow"
5. Specify the warm background — "on Parchment (#f5f4ed)" or "on Near Black (#141413)"

---

## 10. Voice & Tone

This blog speaks the way a careful engineer's notes do — informed, precise, and allergic to hype. The voice qualifies confident claims, avoids tech-industry superlatives, and treats the reader as someone who wants the actual mechanism, not the marketing. Serious subjects get serious language; lighter moments are dry, not performative. Emoji and exclamation points are rare — warmth comes from word choice and editorial pacing, not decoration. The overall effect should read like a well-edited technical essay, not a feed post.

| Context                     | Tone                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------- |
| Post titles                 | Declarative, specific. No "혁신적인", "충격적인", "완벽 정리". Name the actual topic. |
| Technical explanation       | Mechanism + honest limit in one breath. State what it does and where it breaks.       |
| Error / gotcha notes        | Specific + blameless. The exact failure and the exact fix, no filler.                 |
| Documentation-style writing | Direct. "이렇게 동작한다." No "쉽게", "간단하게" as filler modifiers.                 |
| Intro / CTA                 | Plain verb + noun. "AWS SAA 정리", not "당신의 커리어를 바꿀".                        |
| Captions / metadata         | Factual. Dates, sources, exact numbers.                                               |

**Forbidden phrases.** "혁신적인", "완벽한", "충격적인", "꿀팁", "당신이 몰랐던", "이것만 알면", "world-class", "game-changer". Exclamation marks on routine headings. Emoji in technical explanations, error notes, or documentation. Performative hooks ("이 글을 끝까지 읽으면…") — state the topic and get to it.

## 11. Brand Narrative

This is the personal technical blog of **Hanjoon Bae**, a data/engineering practitioner. Its thesis is the loop in the homepage tagline: **기술을 배우고, 만들고, 기록합니다** — _learn technology, build with it, and write down what was learned._ The blog is a study log first and an audience product never: posts cover what is actively being studied (AWS SAA, Databricks DEA), implementations being built (구현), and papers being read (논문 리뷰).

The design rejects two defaults. Against the dev-blog convention of cold terminal-dark or clinical-white surfaces, it chooses a warm parchment reading room: the writing is meant to be _read_, slowly, not skimmed off a dark feed. And against the content-marketing convention of hooks, superlatives, and "꿀팁" framing, it chooses the register of careful notes — a claim that can't be backed by a mechanism or a source doesn't get written.

What this blog refuses: hype framing, clickbait titles, and unqualified confidence about things still being learned. What it embraces: measured language, editorial pacing, warmth as a form of honesty, and the discipline of recording exactly what was understood — including the parts that are still uncertain.

## 12. Principles

1. **기록 over performance.** A post exists to record what was actually learned, not to perform expertise. If something isn't understood yet, the post says so rather than papering over it.
2. **Mechanism over conclusion.** Explain how a thing works and where it breaks, in the same breath. A "정리" that omits the failure modes is incomplete.
3. **Warmth is a reading signal.** Parchment canvas and terracotta accent exist because terminal-dark and clinical-white both make long reading feel like work. Warmth reads as "this was written for a human to sit with."
4. **Measured language always.** "이 방법은 X 상황에서 잘 동작한다" beats "이 방법이 정답이다". Hedging where the edge is real is a feature, not a weakness.
5. **No cool colors in the palette.** Blue-grays and clinical teals read as "product optimizing for engagement." This is a reading surface, not a product. Warm only.
6. **Editorial pacing.** Body line-height 1.60, generous section spacing, single-column reading rhythm. Content that asks to be read, not scanned.
7. **Serif carries weight.** Serif headlines at weight 500 say the post was considered before it was published. Bold weights would signal urgency; that's not the mode.

## 13. Personas

_Personas below are fictional reader archetypes informed by the blog's actual subject matter (cloud/data engineering, certification study, paper reviews), not individual people._

**Studying-for-the-same-cert reader.** A working engineer preparing for AWS SAA or Databricks DEA. Lands on a post via search while studying. Wants the actual mechanism and the gotchas, not a "한 번에 합격" hook. Trusts the post more _because_ it states caveats and cites the docs.

**Practitioner cross-referencing an implementation.** Mid-level data engineer who hit the same problem the 구현 post solves. Skims for the code and the "why this and not that" reasoning. Bounces immediately from filler intros; stays for the precise tradeoff discussion.

**Paper-review follower.** Someone tracking the same research area, reading the 논문 리뷰 posts to decide whether to read the paper themselves. Values an honest "what this paper does and doesn't show" summary over breathless framing.

**The author, six months later.** The most important reader: Hanjoon revisiting his own notes to reuse what he learned. Every post is written so that future-self can reconstruct the understanding from the record — which is why mechanism, sources, and uncertainty all get written down.

## 14. States

| State                                     | Treatment                                                                                                                                                                        |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Empty (index, no posts in a category)** | One Olive Gray (`#5e5d59`) sans line at 15px: "아직 글이 없습니다." No illustration, no emoji.                                                                                   |
| **Empty (search, no results)**            | One Olive Gray line: "검색 결과가 없습니다." Suggestions only if genuinely useful.                                                                                               |
| **Loading (page / route transition)**     | Parchment background with Border Cream (`#f0eee6`) skeleton blocks at final dimensions. Warm-tinted shimmer ~1.8s. Blue-tinted skeletons are forbidden — they break the palette. |
| **Error (page not found)**                | A single paragraph in Olive Gray, specific and without apology: which page is missing and where to go instead. No 🚫 or ⚠.                                                       |
| **Hover (link)**                          | Terracotta (`#c96442`) text resolves toward Coral (`#d97757`); underline appears or thickens. No layout shift.                                                                   |
| **Active nav item**                       | Terracotta accent marks the current section — the one place chromatic color signals "you are here."                                                                              |
| **Code block**                            | Warm/neutral syntax theme; never introduces cool blue-grays into the surrounding chrome.                                                                                         |
| **Skeleton**                              | Border Cream blocks at exact final dimensions. Warm shimmer. Serif-heading skeletons use slightly wider lines to match visual weight.                                            |

## 15. Motion & Easing

**Durations**:

| Token             | Value | Use                                         |
| ----------------- | ----- | ------------------------------------------- |
| `motion-instant`  | 0ms   | Focus rings, toggle state commit            |
| `motion-fast`     | 160ms | Hover states, small fades                   |
| `motion-standard` | 260ms | Sheet, card expand, section transition      |
| `motion-slow`     | 420ms | Page-level transitions, first-paint reveals |

**Easings**:

| Token           | Curve                              | Use                                                         |
| --------------- | ---------------------------------- | ----------------------------------------------------------- |
| `ease-enter`    | `cubic-bezier(0.2, 0.6, 0.25, 1)`  | Sheets rise, modals appear — settled landing, never springy |
| `ease-exit`     | `cubic-bezier(0.4, 0.0, 0.9, 1)`   | Dismissals, quiet removals                                  |
| `ease-standard` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Two-way transitions, card states                            |

**Explicitly forbidden.** No overshoot/spring curves (`cubic-bezier(0.34, 1.56, 0.64, 1)`). Motion does not bounce — overshoot is playful and slightly eager; this blog is considered, not eager.

**Signature motions.**

1. **Light / Dark section alternation.** Where a surface crosses from Parchment to Near Black, the background crossfades at `motion-slow`; headlines do not move. The one deliberately cinematic moment.
2. **Terracotta hover.** Links resolve from Terracotta to Coral on hover at `motion-fast`. Terracotta is otherwise static — it marks, it doesn't animate.
3. **Reduce motion.** Under `prefers-reduced-motion: reduce`, all `motion-*` tokens collapse to `motion-instant`. The blog stays fully functional; no motion at the cost of accessibility.

---

**Bootstrapped from:** `claude` (Anthropic) reference DESIGN.md — tokens preserved verbatim, no axis delta. Domain adapted to a personal Korean tech blog; §11–13 written from the blog's own facts (homepage tagline, content categories). Voice §10 keeps the reference's anti-hype editorial register, re-grounded in Korean technical-writing forbidden phrases.
