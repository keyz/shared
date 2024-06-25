import { test, expect } from "vitest";
import { tryCatch } from "../public/tryCatch.js";
import { tryCatchAsync } from "../public/tryCatchAsync.js";

test("happy cases", async () => {
  const output = tryCatch(() => ({ id: 4 }));

  expect(output).toMatchInlineSnapshot(`
    {
      "error": null,
      "must": [Function],
      "ok": true,
      "result": {
        "id": 4,
      },
    }
  `);
  expect(output.must()).toBe(output.result); // Same pointer

  const outputAsync = await tryCatchAsync(async () => ({ id: 4 }));
  expect(outputAsync).toMatchInlineSnapshot(`
    {
      "error": null,
      "must": [Function],
      "ok": true,
      "result": {
        "id": 4,
      },
    }
  `);
  expect(outputAsync.must()).toBe(outputAsync.result); // Same pointer
});

test("errors", async () => {
  const output = tryCatch(() => {
    throw new Error("nonono");
  });

  expect(output).toMatchInlineSnapshot(`
    {
      "error": [Error: nonono],
      "must": [Function],
      "ok": false,
      "result": null,
    }
  `);

  try {
    output.must();
    expect("this").toBe("unreachable");
  } catch (mustError: any) {
    expect(mustError).toMatchInlineSnapshot(`[Error: nonono]`);

    expect(mustError).toBe(output.error); // Same pointer
    expect(mustError.stack).toBe(output.error?.stack); // Same stack

    expect(mustError.stack).toBeTruthy(); // Not empty
    expect(mustError.stack).not.toMatch(/thunk/i); // Does not include the wrapper name
  }

  const outputAsync = await tryCatchAsync(() => {
    throw new Error("nonono");
  });

  expect(outputAsync).toMatchInlineSnapshot(`
    {
      "error": [Error: nonono],
      "must": [Function],
      "ok": false,
      "result": null,
    }
  `);

  try {
    outputAsync.must();
    expect("this").toBe("unreachable");
  } catch (mustError: any) {
    expect(mustError).toMatchInlineSnapshot(`[Error: nonono]`);

    expect(mustError).toBe(outputAsync.error); // Same pointer
    expect(mustError.stack).toBe(outputAsync.error?.stack); // Same stack

    expect(mustError.stack).toBeTruthy(); // Not empty
    expect(mustError.stack).not.toMatch(/thunk/i); // Does not include the wrapper name
  }
});
