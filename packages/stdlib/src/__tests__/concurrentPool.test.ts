import { test, expect, describe } from "vitest";
import {
  concurrentPool,
  type TInstruction,
  type TYield,
} from "../public/concurrentPool";
import { sleep } from "../public/sleep";

describe("concurrentPool", () => {
  test("simple", async () => {
    const iter = concurrentPool({
      queue: Array.from({ length: 5 }, (_, i) => async () => {
        return i;
      }),
      concurrencyLimit: 2,
    });

    const result: Array<TYield<number>> = [];

    while (true) {
      const next = await iter.next();
      expect(next.done).toBe(false);

      const value = next.value;
      result.push(value);

      if (value.status === "idle") {
        break;
      }
    }

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "result": 0,
          "status": "active",
        },
        {
          "result": 1,
          "status": "active",
        },
        {
          "result": 2,
          "status": "active",
        },
        {
          "result": 3,
          "status": "active",
        },
        {
          "result": 4,
          "status": "active",
        },
        {
          "result": null,
          "status": "idle",
        },
      ]
    `);
  });

  test("race", async () => {
    const iter = concurrentPool({
      queue: Array.from({ length: 5 }, (_, i) => async () => {
        await sleep(i === 0 ? 100 : 1); // `0` finishes last
        return i;
      }),
      concurrencyLimit: 2,
    });

    const result: Array<TYield<number>> = [];

    while (true) {
      const next = await iter.next();
      expect(next.done).toBe(false);

      const value = next.value;
      result.push(value);

      if (value.status === "idle") {
        break;
      }
    }

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "result": 1,
          "status": "active",
        },
        {
          "result": 2,
          "status": "active",
        },
        {
          "result": 3,
          "status": "active",
        },
        {
          "result": 4,
          "status": "active",
        },
        {
          "result": 0,
          "status": "active",
        },
        {
          "result": null,
          "status": "idle",
        },
      ]
    `);
  });

  test("append new tasks", async () => {
    const iter = concurrentPool({
      queue: Array.from({ length: 3 }, (_, i) => async () => {
        return i;
      }),
      concurrencyLimit: 2,
    });

    const result: Array<TYield<number>> = [];

    let shouldAppend = false;
    let hasAppended = false;

    while (true) {
      let signal: TInstruction<number>;

      if (shouldAppend && !hasAppended) {
        signal = {
          queue: Array.from({ length: 3 }, (_, i) => async () => {
            return i + 10;
          }),
        };
        hasAppended = true;
        shouldAppend = false;
      } else {
        signal = undefined;
      }

      const next = await iter.next(signal);
      expect(next.done).toBe(false);

      const value = next.value;
      result.push(value);

      if (value.status === "idle") {
        if (!hasAppended) {
          shouldAppend = true;
        } else {
          break;
        }
      }
    }

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "result": 0,
          "status": "active",
        },
        {
          "result": 1,
          "status": "active",
        },
        {
          "result": 2,
          "status": "active",
        },
        {
          "result": null,
          "status": "idle",
        },
        {
          "result": 10,
          "status": "active",
        },
        {
          "result": 11,
          "status": "active",
        },
        {
          "result": 12,
          "status": "active",
        },
        {
          "result": null,
          "status": "idle",
        },
      ]
    `);
  });

  test("rejection behavior", async () => {
    const iter = concurrentPool({
      queue: Array.from({ length: 5 }, (_, i) => async () => {
        if (i <= 2) {
          return i;
        }

        throw new Error(`${i}`);
      }),
      concurrencyLimit: 2,
    });

    await iter.next(); // 0 is ok
    await iter.next(); // 1 is ok
    await iter.next(); // 2 is ok

    // 3 throws
    await expect(async () => {
      await iter.next();
    }).rejects.toThrowErrorMatchingInlineSnapshot(`[Error: 3]`);

    expect(await iter.next()).toEqual({
      done: true,
      value: undefined,
    });
  });

  test("invalid input", async () => {
    const iter = concurrentPool({ queue: [], concurrencyLimit: 0 });

    await expect(async () => {
      await iter.next();
    }).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: concurrencyLimit > 0: unexpected condition false]`,
    );
  });
});
