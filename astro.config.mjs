// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { localPostWriter } from './scripts/local-post-writer-plugin.mjs';

export default defineConfig({
  site: 'https://hanjoonbae.github.io',
  integrations: [mdx(), react(), sitemap()],
  vite: {
    plugins: [localPostWriter()],
  },
});
