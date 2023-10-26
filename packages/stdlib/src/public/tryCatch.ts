import { recaptureErrorStack } from "./recaptureErrorStack";
import type { TEither } from "./types";

export type { TEither };

export function tryCatch<T>(thunk: () => T): TEither<T> {
  try {
    const result = thunk();

    return {
      ok: true,
      result,
      error: null,
      must: () => result,
    };
  } catch (error) {
    const cleanError = recaptureErrorStack(error, tryCatch) as any as Error;

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
