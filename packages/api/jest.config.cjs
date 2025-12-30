const path = require("node:path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const coverageThresholdEnv = Number(process.env.COVERAGE_THRESHOLD);
const coverageThreshold = Number.isFinite(coverageThresholdEnv)
  ? coverageThresholdEnv
  : 70;

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: "<rootDir>/",
  }),
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/*.test.ts",
    "!<rootDir>/src/**/__tests__/**",
  ],
  coverageReporters: ["text-summary", "lcov"],
  coverageThreshold: {
    global: {
      branches: coverageThreshold,
      functions: coverageThreshold,
      lines: coverageThreshold,
      statements: coverageThreshold,
    },
  },
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }],
  },
};
