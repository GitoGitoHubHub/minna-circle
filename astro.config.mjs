import { defineConfig } from 'astro/config';

// SITE は Vercel 環境変数から。ローカルでも .env で補えます。
const SITE = process.env.SITE || 'https://minnacircle.vercel.app';

export default defineConfig({
  site: SITE,          // ★ これで Astro は静的出力に必要な完全URLを把握
  output: 'static',    // 明示しておくと安全
});
