import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // 本番URL（必要ならあとで独自ドメインに変更可）
  site: "https://minna-circle.vercel.app",

  // ★ここが重要：静的出力。adapterは不要（NoAdapterInstalledの回避）
  output: "static",

  // 追加の統合（sitemap 自動生成）
  integrations: [
    sitemap({
      // インデックスさせないURL（必要に応じて調整）
      exclude: ["/404", "/search", "/vendor/new", "/api/**"],
    }),
  ],
});
