// @ts-nocheck

async function asyncFoo() {}

export function test() {
  try {
    // Type-awareness check
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    asyncFoo();
  } catch (_) {}

  const n: any = 3;
  // Custom rule check
  // eslint-disable-next-line @keyanz/unsafe-casting
  const _ = n as string;

  // New rules check
  // eslint-disable-next-line no-constant-binary-expression
  const _foo = !3 == null;
}
