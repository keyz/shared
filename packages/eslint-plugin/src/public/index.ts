import * as unsafeCasting from "../rules/unsafe-casting";
import type { TSESLint } from "@typescript-eslint/utils";

const plugin: TSESLint.Linter.Plugin = {
  rules: {
    [unsafeCasting.name]: unsafeCasting.rule,
  },
};

// ESLint doesn't like `export default`
export = plugin;
