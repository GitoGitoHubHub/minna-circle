import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [tailwind()],
  adapter: vercel(),   // Vercel 用アダプター
  output: 'static'     // 静的サイト出力
});
