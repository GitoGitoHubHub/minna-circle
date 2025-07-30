import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  base: '/', // ★必要ならここを残す
  integrations: [tailwind()],
  output: 'static',
});
