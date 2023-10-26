const { sharedRules } = require("../shared-rules");

/** @type {import("./types").Config} */
const config = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "@keyanz"],
  env: {
    node: true,
  },
  rules: {
    ...sharedRules,
  },
  ignorePatterns: ["/dist/**/*"],
};

module.exports = config;
