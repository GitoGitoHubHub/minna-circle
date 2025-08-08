import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless"; // ←これ必須

export default defineConfig({
  output: "server",                   // ←これ必須
  adapter: vercel(),                  // ←これ必須
  integrations: [tailwind()],
});
