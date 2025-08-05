import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel'; // または '@astrojs/vercel/static'

export default defineConfig({
  integrations: [tailwind()],
  adapter: vercel(), // サーバーレス用、static 用いずれかを選択
  // output は指定しない（アダプターに任せる）
});
