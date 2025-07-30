import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  base: '/', // ★必要に応じて変更（例：'/minna-circle/'）
  integrations: [tailwind()],
  output: 'static',
});
