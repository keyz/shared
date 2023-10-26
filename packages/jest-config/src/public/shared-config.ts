import type { Config } from "jest";

export const sharedConfig: Config = {
  transform: {
    "\\.[jt]sx?$": "@keyanz/jest-config/transformer",
  },
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
};
