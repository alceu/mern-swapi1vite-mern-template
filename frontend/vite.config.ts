/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgrPlugin from "vite-plugin-svgr";

import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  if (!env.FRONTEND_PORT) {
    throw new Error("Missing required environment variable: FRONTEND_PORT");
  }

  return {
    server: {
      port: Number(env.FRONTEND_PORT),
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
        '@features': path.resolve(__dirname, './src/features'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@components': path.resolve(__dirname, './src/components'),
        '@api': path.resolve(__dirname, './src/features/api'),
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
  }
});
