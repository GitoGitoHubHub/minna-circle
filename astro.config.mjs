import { defineConfig } from 'astro/config';

// 本番URLをVercelの環境変数 SITE で入れる（未設定時はデプロイURLに合わせる）
const SITE = process.env.SITE || 'https://minnacircle.vercel.app';

export default defineConfig({
  site: SITE,
  output: 'static',   // ★ これで静的固定
  // integrations: [] // SSR系のインテグレーションは入れない
});
