// @ts-check
require("@keyanz/eslint-config/patch");

/** @type {import("@keyanz/eslint-config/types").Config} */
const config = {
  root: true,
  extends: ["@keyanz/eslint-config/node"],

  // Enable type-aware linting
  parserOptions: {
    project: ["tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
};

module.exports = config;
