// @ts-check
import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

import node from "@astrojs/node";

const { DEPLOY_ADAPTER } = loadEnv(
  process.env.NODE_ENV ?? "",
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  devToolbar: {
    enabled: false,
  },

  adapter:
    DEPLOY_ADAPTER === "node"
      ? node({
          mode: "standalone",
        })
      : vercel({}),
  integrations: [react()],
});
