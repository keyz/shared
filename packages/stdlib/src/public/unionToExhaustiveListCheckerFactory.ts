// https://stackoverflow.com/a/70792483
type TClothed<T> = [T];

// https://stackoverflow.com/a/60132060
export function unionToExhaustiveListCheckerFactory<T = void>() {
  return function <L extends Array<T>>(
    list: L &
      (T extends void ? "Missing required type parameter `T`" : unknown) &
      (TClothed<T> extends TClothed<L[number]>
        ? unknown
        : "List does not include every member of the union"),
  ) {
    return list;
  };
}
