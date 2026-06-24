# Design Specification — stefanzweifel.dev

> **URL:** https://stefanzweifel.dev
> **분석일:** 2026-06-24
> **기술 스택:** Tailwind CSS v4 (utility-first), System Font Stack, Semantic HTML5

---

## 1. 디자인 개요

Stefan Zweifel의 개인 포트폴리오/블로그 사이트로, **미니멀리즘**을 핵심 원칙으로 삼는다. 불필요한 장식 요소 없이 콘텐츠 가독성을 극대화하며, 단 하나의 포인트 요소인 상단 프라이드 그라디언트 바로 개성을 표현한다.

- 레이아웃: 중앙 정렬 단일 컬럼 (max-width: 672px / `max-w-2xl`)
- 색조: 흰 배경 + 슬레이트 계열 중성 색상
- 상호작용: 미묘한 hover 전환 효과

---

## 2. 색상 시스템 (Color System)

### 2.1 Primary Palette (Slate Scale)

| 역할                    | Tailwind 클래스    | Computed Color                 | 근사 Hex    |
| ----------------------- | ------------------ | ------------------------------ | ----------- |
| 본문 기본 텍스트        | `text-slate-900` | `oklch(0.208 0.042 265.755)` | `#0f172a` |
| 섹션 제목, 링크 텍스트  | `text-slate-800` | `oklch(0.279 0.041 260.031)` | `#1e293b` |
| 내비게이션, 보조 텍스트 | `text-slate-600` | `oklch(0.446 0.043 257.281)` | `#475569` |
| 날짜/메타 정보          | `text-gray-500`  | `oklch(0.551 0.027 264.364)` | `#6b7280` |
| 프로젝트 설명           | `text-slate-600` | `oklch(0.446 0.043 257.281)` | `#475569` |

### 2.2 Background & Surface

| 역할             | 값                              |
| ---------------- | ------------------------------- |
| 페이지 배경      | `#ffffff` (bg-white)          |
| 카드 hover 배경  | `bg-slate-50/25` (반투명)     |
| 코드 블록 배경   | `bg-gray-900` (`#111827`)   |
| 코드 블록 텍스트 | `text-gray-200` (`#e5e7eb`) |

### 2.3 Accent — Rainbow Gradient Bar

```css
/* 상단 2px 높이 프라이드 그라디언트 바 */
/* Tailwind 커스텀 클래스: .bg-gradient-pride */
height: 2px;
/* 무지개 스펙트럼 그라디언트 + blur-sm / blur-[1px] 레이어링으로 부드러운 글로우 효과 */
```

### 2.4 Selection Color

```css
::selection {
  background-color: #fef4ad; /* 연노랑 하이라이트 */
  color: #160404;            /* 거의 검정 */
}
```

### 2.5 Interactive States

| 상태                | 효과                                                                            |
| ------------------- | ------------------------------------------------------------------------------- |
| 링크 hover          | `hover:no-underline` (기본은 underline)                                       |
| 로고 hover          | `hover:bg-gray-100` + `rounded-lg`                                          |
| 프로젝트 카드 hover | `hover:bg-slate-50/25` + `hover:border-slate-300` + `hover:border-dashed` |

---

## 3. 타이포그래피 (Typography)

### 3.1 Font Family

```css
font-family: ui-sans-serif, system-ui, sans-serif,
             "Apple Color Emoji", "Segoe UI Emoji",
             "Segoe UI Symbol", "Noto Color Emoji";
/* 코드: "JetBrains Mono", "SFMono-Regular", ui-monospace, Menlo, Monaco, Consolas, ... */
```

시스템 폰트 스택 사용 → 플랫폼에 따라 San Francisco (macOS/iOS), Segoe UI (Windows), Roboto (Android) 등이 적용됨.

### 3.2 Type Scale

| 요소                 | font-size | font-weight    | line-height | 색상          |
| -------------------- | --------- | -------------- | ----------- | ------------- |
| `<body>`           | 16px      | 400            | 24px (1.5)  | slate-900     |
| `<h1>` (이름)      | 16px      | 500 (medium)   | 24px        | slate-900     |
| `<h2>` (직함)      | 16px      | 500 (medium)   | 24px        | slate-600     |
| `<h3>` (섹션 제목) | 16px      | 500 (medium)   | 24px        | slate-900     |
| `<p>` (본문)       | 16px      | 400            | 28px (1.75) | slate-600~700 |
| 내비게이션 링크      | 14px      | 500 (medium)   | —          | slate-600     |
| 날짜 메타            | 16px      | 400            | —          | gray-500      |
| 프로젝트 이름        | 16px      | 600 (semibold) | —          | slate-800     |
| 프로젝트 설명        | 14px      | 400            | —          | slate-600     |

> **특이사항:** h1~h3 모두 동일한 16px 크기를 사용하며, font-weight으로만 위계를 표현하는 것이 특징.

---

## 4. 레이아웃 & 그리드 (Layout & Grid)

### 4.1 전체 컨테이너
