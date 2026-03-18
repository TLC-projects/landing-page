// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://ceaitlc.edu.co/',

  integrations: [
    react(),
    sitemap()
  ],

  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static',
  adapter: netlify()
});