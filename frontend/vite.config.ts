/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgrPlugin from "vite-plugin-svgr";

import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  if (!env.VITE_FRONTEND_PORT) {
    throw new Error(
      "Missing required environment variable: VITE_FRONTEND_PORT"
    );
  }

  return {
    server: {
      port: Number(env.VITE_FRONTEND_PORT),
      host: true,
    },
    plugins: [
      react(),
      svgrPlugin({
        svgrOptions: {
          icon: true,
        },
      }),
    ],
    resolve: {
      alias: {
        "@pwa": path.resolve(__dirname, "./src/"),
      },
    },
    build: {
      outDir: "./build",
    },
    test: {
      globals: true,
      environment: "jsdom",
      css: true,
      setupFiles: "./src/test/setup.ts",
    },
  };
});
