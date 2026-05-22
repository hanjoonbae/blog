<%*
const currentPath = tp.file.path(true)
const currentNoExt = currentPath.replace(/\.md$/, "")
const enNoExt = currentNoExt.endsWith("-ko") ? currentNoExt.slice(0, -3) : currentNoExt
const koNoExt = `${enNoExt}-ko`
const title = tp.file.title.replace(/-ko$/, "")
const yaml = (value) => JSON.stringify(value)

tR += `---
title: ${yaml(title)}
lang: en
translation: /${koNoExt}
aliases:
  - ${yaml(title)}
tags:
---`
%>
