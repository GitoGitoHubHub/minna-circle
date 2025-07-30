// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static', // ←ここが超重要
});
export default defineConfig({
  base: '/', // ←★追記！
  integrations: [tailwind()],
  output: 'static',
});
