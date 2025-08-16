import { defineConfig } from 'astro/config';

// ★ 本番ドメインに置き換えてください（例）
const SITE = process.env.SITE || 'https://minnacircle.example.com';

export default defineConfig({
  site: SITE,
  // 必要なら他の統合や設定をここに
});
