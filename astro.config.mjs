import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const SITE = process.env.SITE || "https://minna-circle.vercel.app";

export default defineConfig({
  site: SITE,
  output: "static",
  integrations: [
    sitemap({
      exclude: ["/404", "/search", "/vendor/new", "/api/**"],
    }),
  ],
});
