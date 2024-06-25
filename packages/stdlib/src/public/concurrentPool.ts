import { assertCondition } from "./assertCondition.js";

export type TThunk<T> = () => Promise<T>;
export type TYield<T> =
  | {
      status: "active";
      result: T;
    }
  | {
      status: "idle";
      result: null;
    };
export type TInstruction<T> = {
  queue: Array<TThunk<T>>;
} | void;

export async function* concurrentPool<T>(input: {
  queue: Array<TThunk<T>>;
  concurrencyLimit?: number;
}): AsyncGenerator<TYield<T>, never, TInstruction<T>> {
  const { queue, concurrencyLimit = Infinity } = input;
  assertCondition(concurrencyLimit > 0, "concurrencyLimit > 0");

  const thunkQueue: Set<TThunk<T>> = new Set(queue);
  const promiseQueue: Set<Promise<T>> = new Set();

  while (true) {
    fillUpAndKickOffPromiseQueue(
      thunkQueue,
      promiseQueue,
      concurrencyLimit - promiseQueue.size,
    );

    let instruction: TInstruction<T>;
    if (promiseQueue.size === 0) {
      instruction = yield {
        status: "idle",
        result: null,
      };
    } else {
      const first: {
        pointer: Promise<T>;
        value: T;
      } = await Promise.race(
        [...promiseQueue].map(async (pointer) => {
          const value = await pointer;

          return {
            value,
            pointer,
          };
        }),
      );

      promiseQueue.delete(first.pointer);

      instruction = yield {
        status: "active",
        result: first.value,
      };
    }

    for (const newThunk of instruction?.queue ?? []) {
      thunkQueue.add(newThunk);
    }
  }
}

function fillUpAndKickOffPromiseQueue<T>(
  thunkQueue: Set<TThunk<T>>,
  promiseQueue: Set<Promise<T>>,
  count: number,
) {
  for (let i = 0; i < count; i++) {
    const next = thunkQueue.values().next();
    if (next.done) {
      break;
    }

    const thunk = next.value;
    thunkQueue.delete(thunk);
    promiseQueue.add(thunk());
  }
}
