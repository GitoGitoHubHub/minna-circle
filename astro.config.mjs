import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  integrations: [tailwind()],
  adapter: vercel(), // static アダプター
  // output は指定不要（アダプターが自動で設定）
});
