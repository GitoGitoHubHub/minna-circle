import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless"; // ★ Vercel アダプタ（サーバーレス）

export default defineConfig({
  // 公開URL（独自ドメイン導入時はここを変更）
  site: "https://minna-circle.vercel.app",

  // ★ サーバー出力に変更（SSR要素があってもOK）
  output: "server",

  // Vercel 用アダプタを有効化
  adapter: vercel(),

  // そのまま sitemap 自動生成（除外は必要に応じて調整）
  integrations: [
    sitemap({
      exclude: ["/404", "/search", "/vendor/new", "/api/**"],
    }),
  ],
});
