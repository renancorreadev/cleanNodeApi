/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from "@jest/types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const config: Config.InitialOptions = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest"
  },
  preset: "@shelf/jest-mongodb"
};

export default config;
