<%*
const currentPath = tp.file.path(true)
const currentNoExt = currentPath.replace(/\.md$/, "")
const enNoExt = currentNoExt.endsWith("-ko") ? currentNoExt.slice(0, -3) : currentNoExt
const koNoExt = `${enNoExt}-ko`
const title = tp.file.title.replace(/-ko$/, "")
const yaml = (value) => JSON.stringify(value)
const slugify = (value) =>
  value
    .split("/")
    .map((segment) =>
      segment
        .replace(/\s/g, "-")
        .replace(/&/g, "-and-")
        .replace(/%/g, "-percent")
        .replace(/\?/g, "")
        .replace(/#/g, ""),
    )
    .join("/")

tR += `---
title: ${yaml(title)}
lang: en
translation: /${slugify(koNoExt)}
aliases:
  - ${yaml(title)}
tags:
---`
%>
