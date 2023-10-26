import { test, expect, describe, jest } from "@jest/globals";
import { Mutex } from "../public/mutex";

jest.useFakeTimers();

test("can be acquired asynchronously and released", async () => {
  const lock = new Mutex();
  expect(lock.isAcquired).toBe(false);

  await lock.acquireAsync();
  expect(lock.isAcquired).toBe(true);

  lock.release();
  expect(lock.isAcquired).toBe(false);
});

test("can be acquired synchronously and released", () => {
  const lock = new Mutex();
  expect(lock.isAcquired).toBe(false);

  lock.tryAcquireSync();
  expect(lock.isAcquired).toBe(true);

  lock.release();
  expect(lock.isAcquired).toBe(false);
});

test("throws if a timeout occurs before it is acquired", async () => {
  const lock = new Mutex();
  await lock.acquireAsync();

  const acquirePromise = lock.acquireAsync({ timeoutMs: 1000 });
  jest.advanceTimersByTime(1000);
  await expect(acquirePromise).rejects.toThrowErrorMatchingInlineSnapshot(
    `"Timed out (1000ms) waiting for lock"`,
  );

  lock.release();
});

test("can be acquired with a zero timeout if released in the same event loop iteration", async () => {
  const lock = new Mutex();
  await lock.acquireAsync();

  const acquirePromise = lock.acquireAsync({ timeoutMs: 0 });
  lock.release();
  await expect(acquirePromise).resolves.toBeUndefined(); // resolved

  lock.release();
});

test('is acquired in the order of the "acquireAsync" calls', async () => {
  const lock = new Mutex();
  await lock.acquireAsync();

  const acquirePromises = [];
  for (let i = 0; i < 10; i++) {
    acquirePromises.push(lock.acquireAsync());
  }

  while (acquirePromises.length > 0) {
    lock.release();
    // The test will time out if the just-released lock was not acquired by the next acquirer
    await acquirePromises.shift();
  }

  lock.release();
});

test("throws if released while unacquired", () => {
  const lock = new Mutex();
  expect(() => {
    lock.release();
  }).toThrowErrorMatchingInlineSnapshot(`"Cannot release an unacquired lock"`);
});

test("blocks async code that has not acquired the lock", async () => {
  const lock = new Mutex();

  let semaphore = 1;
  async function testSemaphore() {
    await lock.acquireAsync();
    expect(semaphore).toBe(1);

    semaphore--;
    await Promise.resolve();
    expect(semaphore).toBe(0);

    semaphore++;
    lock.release();
  }

  await Promise.all([testSemaphore(), testSemaphore()]);
});

describe("tryAcquireSync", () => {
  test("acquires the lock immediately without waiting", async () => {
    const lock = new Mutex();

    const acquired1 = lock.tryAcquireSync();
    expect(acquired1).toBe(true);

    let acquired2 = false;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    lock.acquireAsync().then(() => {
      acquired2 = true;
    });

    await Promise.resolve();
    expect(acquired2).toBe(false);
  });

  test("returns false if the lock is not free", async () => {
    const lock = new Mutex();

    const acquired1 = lock.tryAcquireSync();
    expect(acquired1).toBe(true);

    const acquired2 = lock.tryAcquireSync();
    expect(acquired2).toBe(false);

    lock.release();

    const acquired3 = lock.tryAcquireSync();
    expect(acquired3).toBe(true);
  });
});
