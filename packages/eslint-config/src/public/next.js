const { sharedRules } = require("../shared-rules");

/**
 * To be used *alongside* `next/core-web-vitals` for Next.js apps
 * - Assuming `eslint-plugin-import` has already been imported by `next/core-web-vitals`
 *
 * @type {import("./types").Config}
 */
const config = {
  plugins: ["@typescript-eslint", "@keyanz"],
  rules: {
    ...sharedRules,

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-sort-props": [
      "error",
      {
        reservedFirst: true,
      },
    ],
  },
};

module.exports = config;
