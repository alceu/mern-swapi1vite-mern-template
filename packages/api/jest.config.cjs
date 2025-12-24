const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: "<rootDir>/",
  }),
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
};
