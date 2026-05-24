---
title: Building an Obsidian Blog with Quartz and GitHub Pages
lang: en
translation: /engineering/building-an-obsidian-blog-with-quartz-ko
aliases:
  - /en/engineering/building-an-obsidian-blog-with-quartz
tags:
  - quartz
  - obsidian
  - github-pages
---
![[engineering/assets/output.webp|500]]
## Why Quartz

I wanted a simple writing workflow where Obsidian stays focused on writing and GitHub Pages handles publishing. Quartz fits this well because it turns a folder of Markdown files into a static website, while still supporting Obsidian-style links, folders, tags, backlinks, search, and a graph view.

The key idea is simple:

```txt
Obsidian writes Markdown
Quartz builds the site
GitHub Actions deploys it to GitHub Pages
```

## Project Structure

The Quartz repository is the blog project, but the actual posts live inside the `content` directory.

```txt
quartz/
  .github/
    workflows/
      deploy.yml
  content/
    index.md
    engineering/
      building-an-obsidian-blog-with-quartz.md
      building-an-obsidian-blog-with-quartz-ko.md
  quartz.config.ts
  quartz.layout.ts
```

I use `content` as the Obsidian vault. That keeps the writing space clean, while the rest of the Quartz project stays available for configuration and deployment.

## Installing Quartz

The setup starts by cloning Quartz and installing dependencies.

```bash
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm i
npx quartz create
```

Quartz uses the `v4` branch by default, so I kept that branch as the publishing branch.

## Connecting My Own GitHub Repository

After cloning Quartz, the original remote points to the Quartz project. For a personal blog, `origin` should point to my own repository instead.

```bash
git remote rm origin
git remote add origin https://github.com/hanjoonbae/blog.git
```

The result is:

```txt
origin   -> my blog repository
upstream -> the original Quartz repository
```

This way, normal pushes go to my blog repository, while the original Quartz repository can still be kept as `upstream` for future updates.

## Deploying with GitHub Actions

I added a GitHub Actions workflow at `.github/workflows/deploy.yml`. It runs whenever I push to the `v4` branch.

```yml
name: Deploy Quartz site to GitHub Pages

on:
  push:
    branches:
      - v4
```

The workflow installs dependencies, builds Quartz, uploads the `public` directory, and deploys it through GitHub Pages.

One small adjustment I made was using the local npm script instead of `npx quartz build`:

```yml
- name: Build Quartz
  run: npm run quartz -- build
```

This keeps the build tied to the local Quartz project and avoids issues from resolving a different CLI version.

## Configuring the Site

The main site settings live in `quartz.config.ts`. I changed the title, locale, and base URL.

```ts
pageTitle: "Hanjoon Blog",
locale: "en-US",
baseUrl: "hanjoonbae.github.io/blog",
```

The layout lives in `quartz.layout.ts`. Quartz already includes useful components such as search, dark mode, the explorer, graph view, backlinks, and a table of contents.

The explorer uses the folder structure inside `content`, so folders naturally work like categories.

## Writing Posts

To write a new post, I create a Markdown file somewhere under `content`.

```txt
content/engineering/my-new-post.md
content/data/my-data-note.md
```

A typical post starts with frontmatter:

```md
---
title: My New Post
lang: en
translation: /engineering/my-new-post-ko
tags:
  - example
---

## Introduction

Content goes here.
```

When I want a Korean version, I create a hidden companion page in the same folder:

```md
---
title: 새 글
lang: ko
translation: /engineering/my-new-post
hide: true
tags:
  - example
---
```

This keeps the public folder structure clean while still allowing the language switch to move between both versions.

## Local Preview

Before publishing, I can preview the blog locally.

```bash
npm run quartz -- build --serve --baseDir blog
```

Then I open:

```txt
http://localhost:8080/blog
```

## Publishing

Publishing is just a normal Git workflow.

```bash
git add content
git commit -m "Add new post"
git push
```

After the push, GitHub Actions builds the Quartz site and deploys it to GitHub Pages.

The final site is served at:

```txt
https://hanjoonbae.github.io/blog/
```

## What This Setup Gives Me

This setup keeps the workflow small and predictable:

- I write in Obsidian.
- Markdown files stay in Git.
- Quartz handles the static site.
- GitHub Actions handles deployment.
- GitHub Pages hosts the blog.

It feels close to writing notes locally, but every push can become a published blog update.
