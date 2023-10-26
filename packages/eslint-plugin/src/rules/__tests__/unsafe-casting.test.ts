import { RuleTester } from "@typescript-eslint/rule-tester";
import { name, rule } from "../unsafe-casting";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run(name, rule, {
  valid: [
    // Double
    `const foo = 1 as any as number`,
    `const foo = 1 as any as { x: T }`,
    // Single
    `const foo = 1 as any`,
    `const foo = 1 as unknown`,
    `const foo = {} as const`,

    // Double
    `foo(1 as any as number)`,
    `foo(1 as any as { x: T })`,
    // Single
    `foo(1 as any)`,
    `foo(1 as unknown)`,
    `foo({} as const)`,
  ],
  invalid: [
    // Single
    {
      code: `const foo = 1 as number`,
      output: `const foo = 1 as any as number`,
      errors: [{ messageId: "asAnyFirst", line: 1, column: 18 }],
    },
    {
      code: `const foo = 1 as { x: T }`,
      output: `const foo = 1 as any as { x: T }`,
      errors: [{ messageId: "asAnyFirst", line: 1, column: 18 }],
    },
    {
      code: `foo(1 as number)`,
      output: `foo(1 as any as number)`,
      errors: [{ messageId: "asAnyFirst", line: 1, column: 10 }],
    },
    {
      code: `foo(1 as { x: T })`,
      output: `foo(1 as any as { x: T })`,
      errors: [{ messageId: "asAnyFirst", line: 1, column: 10 }],
    },

    // Double
    // Not `as any` first
    {
      code: `const foo = 1 as string as number`,
      errors: [{ messageId: "asAnyFirst", line: 1, column: 18 }],
    },
    {
      code: `const foo = 1 as { x: T } as number`,
      errors: [{ messageId: "asAnyFirst", line: 1, column: 18 }],
    },
    {
      code: `const foo = 1 as const as number`,
      errors: [{ messageId: "asAnyFirst", line: 1, column: 18 }],
    },
    {
      code: `const foo = 1 as unknown as number`,
      errors: [{ messageId: "asAnyFirst", line: 1, column: 18 }],
    },
    // Having `as any` last
    {
      code: `const foo = 1 as unknown as any`,
      errors: [{ messageId: "asAnyFirst", line: 1, column: 18 }],
    },
    {
      code: `const foo = 1 as any as any`,
      errors: [{ messageId: "asAnyFirst", line: 1, column: 25 }],
    },

    // More than two
    {
      code: `const foo = 1 as const as any as string`,
      errors: [{ messageId: "chainTooLong", line: 1, column: 34 }],
    },
    {
      code: `foo(1 as const as any as string)`,
      errors: [{ messageId: "chainTooLong", line: 1, column: 26 }],
    },
  ],
});
