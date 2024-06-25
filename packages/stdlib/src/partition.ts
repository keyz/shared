export function partition<T, P extends T>( // With type guard
  list: Array<T>,
  predicate: (item: T) => item is P,
): [pass: Array<P>, fail: Array<Exclude<T, P>>];
export function partition<T>( // Without type guard
  list: Array<T>,
  predicate: (item: T) => boolean,
): [pass: Array<T>, fail: Array<T>];
export function partition<T>( // Implementation
  list: Array<T>,
  predicate: (item: T) => boolean,
): [pass: Array<T>, fail: Array<T>] {
  const pass: Array<T> = [];
  const fail: Array<T> = [];

  for (const item of list) {
    if (predicate(item)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  }

  return [pass, fail];
}
