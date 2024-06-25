import { shuffle } from "./shuffle.js";
import { typedObjectKeys } from "./typedObjectKeys.js";
import type { TAnyLiteralObject } from "./types.js";

export function shuffleObject<const T extends TAnyLiteralObject>(input: T): T {
  const shuffledKeyList = shuffle(typedObjectKeys(input));

  const result = {} as any as T;
  for (const key of shuffledKeyList) {
    result[key] = input[key];
  }

  return result;
}
