// Modified from https://github.com/ide/await-lock

/**
 * A mutex lock for coordination across async functions
 */
export class Mutex {
  private _isAcquired: boolean = false;
  private _waitingResolverSet: Set<() => void> = new Set();

  /**
   * Whether the lock is currently acquired or not. Accessing this property does
   * not affect the status of the lock.
   */
  public get isAcquired(): boolean {
    return this._isAcquired;
  }

  /**
   * Acquires the lock, waiting if necessary for it to become free if it is
   * already locked. The returned promise is fulfilled once the lock is
   * acquired.
   *
   * A timeout (in milliseconds) may be optionally provided. If the lock cannot
   * be acquired before the timeout elapses, the returned promise is rejected
   * with an error. The behavior of invalid timeout values depends on how
   * `setTimeout` handles those values.
   *
   * After acquiring the lock, you **must** call `release` when you are done
   * with it.
   */
  public acquireAsync(options: { timeoutMs?: number } = {}): Promise<void> {
    if (!this._isAcquired) {
      this._isAcquired = true;
      return Promise.resolve();
    }

    const { timeoutMs } = options;
    if (timeoutMs == null) {
      return new Promise((resolve) => {
        this._waitingResolverSet.add(resolve);
      });
    }

    let resolver: () => void;
    let timer: ReturnType<typeof setTimeout>;

    return Promise.race<void>([
      new Promise((resolve) => {
        resolver = () => {
          clearTimeout(timer);
          resolve();
        };
        this._waitingResolverSet.add(resolver);
      }),

      new Promise<void>((_, reject) => {
        timer = setTimeout(() => {
          this._waitingResolverSet.delete(resolver);
          reject(new Error(`Timed out (${timeoutMs}ms) waiting for lock`));
        }, timeoutMs);
      }),
    ]);
  }

  /**
   * Acquires the lock if it is free and otherwise returns immediately without
   * waiting. Returns `true` if the lock was free and is now acquired, and
   * `false` otherwise.
   *
   * This method differs from calling `acquireAsync` with a zero-millisecond
   * timeout in that it runs synchronously without waiting for the JavaScript
   * task queue.
   */
  public tryAcquireSync(): boolean {
    if (!this._isAcquired) {
      this._isAcquired = true;
      return true;
    }

    return false;
  }

  /**
   * Releases the lock and gives it to the next waiting acquirer, if there is
   * one. Each acquirer must release the lock exactly once.
   */
  public release(): void {
    if (!this._isAcquired) {
      throw new Error(`Cannot release an unacquired lock`);
    }

    if (this._waitingResolverSet.size > 0) {
      // Sets preserve insertion order like a queue
      const [resolve] = this._waitingResolverSet;
      this._waitingResolverSet.delete(resolve);
      resolve();
    } else {
      this._isAcquired = false;
    }
  }
}
