import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';   // ←追加

export default defineConfig({
  integrations: [tailwind()],
  adapter: vercel(),   // ←追加（Vercel 用アダプター）
  output: 'static',    // ←静的出力を明示
  // base は特別なサブパスにデプロイする場合のみ指定。通常は '/' のままでOK
});
