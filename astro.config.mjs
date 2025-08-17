import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // or '@astrojs/vercel/edge'

const SITE = process.env.SITE || 'https://minnacircle.vercel.app';

export default defineConfig({
  site: SITE,
  output: 'server',  // ★ SSR
  adapter: vercel(), // ★ Vercelアダプタ
});
