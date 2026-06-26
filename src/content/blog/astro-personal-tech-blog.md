---
title: Astro로 개인 기술 블로그 만들기
description: Quartz에서 Astro로 옮기며 직접 만든 개인 기술 블로그 구조와 커스터마이징 기록
pubDate: 2026-06-26
category: builds
tags:
  - astro
  - markdown
  - blog
  - github-pages
---

## 한 줄 요약

이 블로그는 Quartz 기반 Obsidian 블로그에서 출발했지만, 레이아웃과 디자인을 더 직접 제어하기 위해 Astro로 다시 만든 정적 기술 블로그다.

핵심 구조는 단순하다.

```txt
Markdown 글 작성
Astro content collection이 글을 읽음
정적 페이지로 빌드
GitHub Pages에 배포
```

Quartz는 Obsidian vault를 웹사이트로 바꾸는 데 적합하다. Astro는 블로그의 구조, 라우팅, 레이아웃, 스타일을 직접 만들고 싶을 때 적합하다.

## 왜 Quartz에서 옮겼나

처음에는 Quartz와 Obsidian으로 블로그를 만들었다. Obsidian에서 글을 쓰고, Quartz가 Markdown 파일을 정적 사이트로 빌드하고, GitHub Pages가 배포를 맡는 구조였다.

이 방식의 장점은 분명하다. Obsidian 링크, 태그, 백링크, 검색, 그래프 뷰를 거의 바로 쓸 수 있다. 노트를 공개 문서처럼 보여주는 목적이라면 Quartz는 좋은 선택이다.

다만 내가 만들고 싶었던 블로그는 노트 공개 사이트보다 작은 개인 기술 블로그에 가까웠다. 첫 화면에는 글 목록과 카테고리가 보이고, 글 상세 페이지에는 본문과 목차가 보이면 충분했다. 그래프 뷰나 백링크보다 글의 폭, 색, 목차 위치, hover 스타일, 상단 배너 같은 요소를 직접 정하고 싶었다.

물론 Quartz에서도 대부분 해결할 수 있다. Quartz가 부족해서가 아니라, 내가 Quartz 내부 구조를 충분히 이해하지 못한 상태에서 커스터마이징하려고 했던 것이 문제였다. 이미 잘 만들어진 시스템을 바꾸려면 그 시스템의 컴포넌트, 플러그인, 스타일 구조를 먼저 알아야 한다.

결국 방향을 바꿨다. 완성된 블로그 엔진 위에서 필요한 부분을 찾는 대신, 필요한 기능만 Astro로 직접 만들기로 했다.

## Quartz에서 어려웠던 점

첫 번째는 레이아웃 커스터마이징이다.

Quartz는 `quartz.layout.ts`에서 페이지 구성을 정의한다. 탐색기, 목차, 검색, 그래프 뷰, 백링크 같은 컴포넌트를 조합할 수 있다. 기본 기능을 켜고 끄는 일은 어렵지 않다.

하지만 내가 원한 변경은 단순한 on/off가 아니었다. 첫 화면을 더 조용한 글 목록 중심 화면으로 만들고, 오른쪽 목차의 위치와 밀도를 조정하고, 본문 폭과 hover 상태를 세밀하게 맞추고 싶었다.

두 번째는 스타일의 진입점이다.

Quartz는 자체 테마와 컴포넌트 구조가 있다. 특정 링크 스타일, 글 목록 row, 코드 블록, 목차 active 상태를 바꾸려면 어느 파일이 최종 스타일을 결정하는지 따라가야 한다. 이 과정에서 내가 실제로 이해한 코드보다 추측으로 만지는 코드가 많아졌다.

세 번째는 목적의 차이다.

Quartz는 Obsidian vault를 웹으로 옮기는 경험에 강하다. 이 블로그는 그보다 일반적인 정적 기술 블로그에 가깝다. 글은 Markdown으로 쓰되, 화면과 라우팅은 웹 프로젝트처럼 관리하고 싶었다.

## Astro 구조

현재 블로그의 주요 구조는 다음과 같다.

```txt
src/
  components/
    Header.astro
    Footer.astro
    PostList.astro
    TableOfContents.astro
  content/
    blog/
  layouts/
    BlogPost.astro
  pages/
    index.astro
    blog/
      [...slug].astro
      index.astro
    categories/
      [category].astro
  styles/
    global.css
```

각 파일의 역할은 비교적 분명하다.

| 파일 | 역할 |
| --- | --- |
| `src/content/blog/*.md` | 글 원본 |
| `src/content.config.ts` | 글 frontmatter 스키마 |
| `src/pages/index.astro` | 홈 화면 |
| `src/pages/blog/index.astro` | 전체 글 목록 |
| `src/pages/blog/[...slug].astro` | 글 상세 페이지 생성 |
| `src/pages/categories/[category].astro` | 카테고리별 글 목록 |
| `src/layouts/BlogPost.astro` | 본문 레이아웃 |
| `src/components/TableOfContents.astro` | 오른쪽 목차 |
| `src/styles/global.css` | 전역 스타일 |

이 구조의 장점은 수정 위치가 바로 보인다는 점이다. 글 목록을 바꾸려면 `PostList.astro`를 보면 된다. 본문 화면을 바꾸려면 `BlogPost.astro`를 보면 된다. 배너 이미지 위치를 바꾸려면 `global.css`의 `.header-hero-img`를 보면 된다.

## Content collection

Astro에서는 `src/content.config.ts`에서 글의 형태를 정의한다.

```ts
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(CATEGORY_IDS),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});
```

모든 글은 이 스키마를 통과해야 한다. `title`, `description`, `pubDate`, `category`, `tags`가 글 목록과 SEO 정보에 사용된다. `draft: true`를 넣으면 공개 목록에서 제외한다.

카테고리는 `src/lib/categories.ts`에 모아둔다.

```ts
export const CATEGORY_IDS = ['aws', 'databricks', 'study', 'builds', 'papers'] as const;
```

카테고리를 enum으로 제한하면 잘못된 카테고리를 frontmatter에 넣었을 때 빌드 단계에서 확인할 수 있다.

## 글 상세 페이지

글 상세 페이지는 `src/pages/blog/[...slug].astro`에서 만든다.

```ts
export async function getStaticPaths() {
  const posts = (await getCollection('blog')).filter((post) => !post.data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post,
  }));
}
```

Astro는 빌드 시점에 `src/content/blog`의 글을 읽고, 각 글의 `id`를 URL로 사용한다. 예를 들어 이 글의 파일명은 다음과 같다.

```txt
src/content/blog/astro-personal-tech-blog.md
```

배포 후 URL은 다음과 같다.

```txt
/blog/astro-personal-tech-blog/
```

본문 렌더링은 `render(post)`가 담당한다.

```ts
const { Content, headings } = await render(post);
```

`Content`는 실제 Markdown 본문이고, `headings`는 목차를 만들 때 사용한다.

## 직접 구현한 것

### 1. 단일 컬럼 레이아웃

본문 폭은 `672px`로 제한했다.

```css
:root {
  --reading-measure: 672px;
}
```

홈, 글 목록, 본문, 푸터가 같은 폭을 공유한다.

```css
main,
.site-nav,
.site-footer {
  width: min(var(--reading-measure), calc(100% - 32px));
  margin-inline: auto;
}
```

넓은 화면에서도 글줄이 과하게 길어지지 않는다. 모바일에서는 `calc(100% - 32px)` 덕분에 좌우 여백만 남기고 화면 폭을 사용한다.

### 2. 상단 배너

홈 화면에는 작은 배너 이미지를 둔다.

```astro
{showHero && (
  <div class="header-hero">
    <img src="/hero-mountains-color.jpg" alt="" aria-hidden="true" class="header-hero-img" />
  </div>
)}
```

글 상세 페이지에서는 배너를 숨긴다.

```astro
<Header showHero={false} />
```

홈에서는 블로그의 분위기를 만들고, 글 상세에서는 본문에 집중하게 하기 위한 분리다.

### 3. 목차

`TableOfContents.astro`는 Markdown heading 중 `h2`, `h3`만 사용한다.

```ts
const items = headings.filter((h) => h.depth === 2 || h.depth === 3);
```

목차는 넓은 화면에서만 오른쪽에 고정한다. 화면 폭이 좁으면 숨긴다.

```css
@media (max-width: 1180px) {
  .toc {
    display: none;
  }
}
```

모바일에서는 목차보다 본문 공간이 더 중요하다고 판단했다.

### 4. 읽기 진행바

글 상세 페이지 상단에는 읽기 진행바가 있다. 스크롤 위치에 따라 `scaleX` 값을 바꾼다.

```js
const scrolled = window.scrollY;
const total = document.documentElement.scrollHeight - window.innerHeight;
bar.style.transform = `scaleX(${total > 0 ? scrolled / total : 0})`;
```

색은 홈 화면의 상단 gradient bar와 같은 계열을 사용한다. 블로그 전체에서 색이 등장하는 지점을 제한하기 위해서다.

## 디자인 기준

이 블로그의 기준은 조용한 문서형 화면이다.

큰 hero 문구, 카드 그리드, 강한 색, 그림자, 배지를 줄였다. 글 제목, 날짜, 카테고리, 목차처럼 읽는 데 필요한 정보만 남겼다.

텍스트 위계는 크기보다 굵기와 색으로 만든다. 제목과 본문 크기의 차이를 크게 두지 않고, slate 계열 색으로 정보의 강도를 나눈다.

링크는 기본적으로 밑줄을 가진다. hover 상태에서는 밑줄을 제거한다. 링크임을 먼저 보여주고, hover에서는 작은 변화만 준다.

코드 블록은 흰 화면에서 분리되어야 하므로 어두운 배경을 사용한다. 그 외 영역에는 그림자를 쓰지 않는다. 구획은 선이나 박스보다 여백으로 나눈다.

## 따라 만들기

Astro 프로젝트를 만든다.

```bash
npm create astro@latest my-blog
cd my-blog
npm install
```

MDX를 쓰고 싶으면 통합을 추가한다.

```bash
npx astro add mdx
```

글 디렉터리를 만든다.

```txt
src/content/blog/
```

`src/content.config.ts`를 만든다.

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

글 파일을 추가한다.

```md
---
title: 첫 글
description: Astro 블로그 첫 글
pubDate: 2026-06-26
category: builds
tags:
  - astro
---

## 시작

본문을 쓴다.
```

글 상세 라우트를 만든다.

```astro
---
import { getCollection, render } from 'astro:content';
import BlogPost from '../../layouts/BlogPost.astro';

export async function getStaticPaths() {
  const posts = (await getCollection('blog')).filter((post) => !post.data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post,
  }));
}

const post = Astro.props;
const { Content, headings } = await render(post);
---

<BlogPost {...post.data} headings={headings}>
  <Content />
</BlogPost>
```

홈 화면에서는 최신 글을 가져와 목록으로 보여준다.

```astro
---
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog'))
  .filter((post) => !post.data.draft)
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 8);
---

<ol>
  {posts.map((post) => (
    <li>
      <a href={'/blog/' + post.id + '/'}>{post.data.title}</a>
    </li>
  ))}
</ol>
```

마지막으로 전역 스타일에서 폭과 기본 색을 정한다.

```css
:root {
  --color-foreground: #0f172a;
  --color-body: #475569;
  --color-canvas: #ffffff;
  --reading-measure: 672px;
}

body {
  margin: 0;
  background: var(--color-canvas);
  color: var(--color-foreground);
  font-family: ui-sans-serif, system-ui, sans-serif;
}

main {
  width: min(var(--reading-measure), calc(100% - 32px));
  margin-inline: auto;
}
```

이 단계까지 만들면 Markdown 글 작성, 글 목록, 글 상세 페이지가 동작한다. 이후 카테고리, RSS, sitemap, 목차, 진행바를 필요에 따라 추가하면 된다.

## 배포

로컬 개발 서버는 다음 명령으로 실행한다.

```bash
npm run dev
```

정적 사이트 빌드는 다음 명령으로 확인한다.

```bash
npm run build
```

빌드 결과물은 `dist/`에 생성된다. GitHub Pages, Cloudflare Pages, Vercel, Netlify 같은 정적 호스팅에 올릴 수 있다.

GitHub Pages를 사용할 경우 `astro.config.mjs`에 site 값을 지정한다.

```js
export default defineConfig({
  site: 'https://hanjoonbae.github.io',
});
```

## 정리

Quartz는 Obsidian 기반 글쓰기와 공개 문서화에 강하다. 기본 기능도 많다. 하지만 내가 원하는 블로그는 더 작은 정적 웹사이트였다.

Astro로 옮기면서 기능은 줄었지만, 수정 위치는 명확해졌다. 글은 `src/content/blog`에 있고, 목록은 `PostList.astro`, 본문은 `BlogPost.astro`, 목차는 `TableOfContents.astro`, 스타일은 `global.css`에 있다.

이 구조의 핵심은 모든 기능을 처음부터 많이 넣는 것이 아니다. 글을 쓰고, 빌드하고, 배포하고, 필요한 부분을 직접 고칠 수 있는 정도의 크기로 블로그를 유지하는 것이다.
