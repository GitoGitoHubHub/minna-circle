import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  integrations: [tailwind()],
  adapter: vercel(),        // 静的アダプターのみ
  // base や output の指定は不要
});
