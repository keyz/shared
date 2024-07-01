import { recaptureErrorStack } from "./recaptureErrorStack.js";
import type { TEither } from "./types.js";

export type { TEither };

export async function tryCatchAsync<T>(
  thunk: () => Promise<T>,
): Promise<TEither<T>> {
  try {
    const result = await thunk();

    return {
      ok: true,
      result,
      error: null,
      must: () => result,
    };
  } catch (error) {
    const cleanError = recaptureErrorStack(
      error,
      tryCatchAsync,
    ) as any as Error;

    return {
      ok: false,
      result: null,
      error: cleanError,
      must: () => {
        throw cleanError;
      },
    };
  }
}
