import { shuffle } from "./shuffle";
import { typedObjectKeys } from "./typedObjectKeys";
import type { TAnyLiteralObject } from "./types";

export function shuffleObject<const T extends TAnyLiteralObject>(input: T): T {
  const shuffledKeyList = shuffle(typedObjectKeys(input));

  const result = {} as any as T;
  for (const key of shuffledKeyList) {
    result[key] = input[key];
  }

  return result;
}
