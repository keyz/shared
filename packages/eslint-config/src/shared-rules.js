/** @type {import("./public/types").Config["rules"]} */
const sharedRules = {
  "curly": "error",
  "eqeqeq": ["error", "always", { null: "never" }],

  "import/no-extraneous-dependencies": [
    "error",
    {
      bundledDependencies: false,
      devDependencies: ["**/__tests__/**/*"],
      optionalDependencies: false,
      peerDependencies: false,
    },
  ],
  "import/order": [
    "error",
    {
      "alphabetize": {
        caseInsensitive: true,
        order: "asc",
      },
      "groups": [
        "builtin",
        "external",
        "internal",
        "parent",
        "sibling",
        "index",
        "object",
        "type",
        "unknown",
      ],
      "newlines-between": "never",
    },
  ],
  "no-constant-binary-expression": "error",

  // See https://typescript-eslint.io/rules/?supported-rules=recommended
  "@typescript-eslint/adjacent-overload-signatures": "error",
  "@typescript-eslint/ban-types": "error",
  "@typescript-eslint/consistent-type-assertions": [
    "error",
    {
      assertionStyle: "as",
      objectLiteralTypeAssertions: "never",
    },
  ],
  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      disallowTypeAnnotations: true,
      fixStyle: "inline-type-imports",
      prefer: "type-imports",
    },
  ],
  "@typescript-eslint/no-empty-interface": "error",
  "@typescript-eslint/no-import-type-side-effects": "error",
  "@typescript-eslint/no-non-null-assertion": "error",
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      argsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_",
      destructuredArrayIgnorePattern: "^_",
      varsIgnorePattern: "^_",
    },
  ],
  "@typescript-eslint/sort-type-constituents": "error",
  "@typescript-eslint/no-shadow": "error",

  // Type-aware rules
  "@typescript-eslint/await-thenable": "error",
  "@typescript-eslint/no-floating-promises": "error",
  "@typescript-eslint/no-misused-promises": [
    "error",
    {
      checksVoidReturn: {
        // `onClick={async () => {}}` is fine
        attributes: false,
      },
    },
  ],
  "@typescript-eslint/return-await": ["error", "always"],

  // Custom rules
  "@keyanz/unsafe-casting": "error",
};

module.exports = {
  sharedRules,
};
