import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// 本番URLは環境変数 SITE（未設定ならVercelのURLに合わせておく）
const SITE = process.env.SITE || "https://minna-circle.vercel.app";

export default defineConfig({
  site: SITE,
  output: "static", // 静的ビルドを強制（SSRアダプタ不要）
  integrations: [
    sitemap({
      // ここにインデックスさせたくないURLを追加
      exclude: [
        "/404",
        "/search",
        "/vendor/new",
        "/api/**",
      ],
      // 必要になったら serialize で priority 等を制御できます
      // serialize: (item) => ({ ...item, changefreq: 'weekly', priority: 0.7 }),
    }),
  ],
});
