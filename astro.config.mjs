import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// ✅ Astroの設定
export default defineConfig({
  integrations: [tailwind()],
  // 出力方法の明示（ないと Vercel が迷うことがあります）
  output: "server", // または "static"（どちらか明示）
});
