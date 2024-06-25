export function randomElement<T>(list: Array<T>): T {
  return list[Math.floor(Math.random() * list.length)];
}
