/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgrPlugin from "vite-plugin-svgr";

import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isTest =
    mode === "test" ||
    process.env.VITEST === "true" ||
    process.env.NODE_ENV === "test";
  const testHost = "127.0.0.1";
  const coverageThresholdRaw =
    env.COVERAGE_THRESHOLD || process.env.COVERAGE_THRESHOLD;
  const coverageThreshold = Number.isFinite(Number(coverageThresholdRaw))
    ? Number(coverageThresholdRaw)
    : 70;

  if (!env.VITE_PWA_PORT) {
    throw new Error("Missing required environment variable: VITE_PWA_PORT");
  }

  return {
    server: {
      port: Number(env.VITE_PWA_PORT),
      host: isTest ? testHost : true,
      hmr: isTest ? { host: testHost } : undefined,
      ws: isTest ? false : undefined,
    },
    preview: {
      port: Number(env.VITE_PWA_PORT),
    },
    plugins: [
      react(),
      svgrPlugin({
        svgrOptions: {
          icon: true,
        },
      }),
      tsconfigPaths(),
    ],
    build: {
      outDir: "./build",
    },
    test: {
      globals: true,
      environment: "jsdom",
      css: true,
      setupFiles: "./src/test/setup.ts",
      coverage: {
        provider: "v8",
        reporter: ["text-summary", "lcov"],
        include: ["src/**/*.{ts,tsx}"],
        exclude: ["src/test/**"],
        thresholds: {
          branches: coverageThreshold,
          functions: coverageThreshold,
          lines: coverageThreshold,
          statements: coverageThreshold,
        },
      },
    },
  };
});
