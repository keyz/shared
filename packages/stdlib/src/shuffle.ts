// Taken from https://github.com/lodash/lodash/blob/master/shuffle.js

export function shuffle<T>(list: Array<T>): Array<T> {
  const length = list.length;
  if (length === 0) {
    return [];
  }

  const result = [...list];
  const lastIndex = length - 1;

  let cursor = -1;
  while (++cursor < length) {
    const randomIndex =
      cursor + Math.floor(Math.random() * (lastIndex - cursor + 1));

    const value = result[randomIndex];
    result[randomIndex] = result[cursor];
    result[cursor] = value;
  }

  return result;
}
