import { defineConfig } from "astro/config";
import storyblok from "@storyblok/astro";
import tailwind from "@astrojs/tailwind";
import basicSsl from "@vitejs/plugin-basic-ssl";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [
    storyblok({
      accessToken: import.meta.env.VITE_STORYBLOK_PREVIEW_TOKEN,
      bridge: import.meta.env.VITE_ASTRO_SSR === "true" || import.meta.env.DEV,
      components: {
        page: "storyblok/Page",
        feature: "storyblok/Feature",
        grid: "storyblok/Grid",
        teaser: "storyblok/Teaser",
        CTA: "storyblok/CTA",
        header: "storyblok/Header",
        hero_stage: "storyblok/HeroStage",
        footer: "storyblok/Footer",
        icon_link: "storyblok/IconLink",
        stocks: "storyblok/Stocks",
      },
    }),
    tailwind(),
    solidJs(),
  ],
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
  output: import.meta.env.VITE_ASTRO_SSR === "true" ? "server" : undefined,
  adapter: import.meta.env.VITE_ASTRO_SSR === "true" ? vercel() : undefined,
});
