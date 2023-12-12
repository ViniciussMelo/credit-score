export default {
  bail: true,

  clearMocks: true,

  coverageProvider: "v8",

  preset: "ts-jest",

  testMatch: ["**/*.spec.ts"],

  collectCoverage: true,

  collectCoverageFrom: ["src/modules/**/*.{js,jsx,ts,tsx}"],

  coverageDirectory: "coverage",

  coverageReporters: ["text-summary", "lcov"],
};