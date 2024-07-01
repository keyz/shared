export type TAnyLiteralObject = Record<string, unknown>;

/**
 * `TValueOf<T>` -> `T[keyof T]`
 */
export type TValueOf<T extends TAnyLiteralObject> = T[keyof T];

/**
 * Any function
 */
export type TCallable = (...argList: any) => any;

/**
 * `TAsyncable<(...) => T>` -> `((...) => T) | ((...) => Promise<T>)`
 */
export type TAsyncable<Fn extends TCallable> = Fn extends (
  ...argList: infer I
) => infer O
  ?
      | ((...argList: I) => Awaited<O>) // (recursively) unwrap
      | ((...argList: I) => Promise<Awaited<O>>) // single wrap
  : never; // not a function

/**
 * `TExtractOnlyParam<(x: T) => ...>` -> `T`
 */
export type TExtractOnlyParam<Fn extends TCallable> = Fn extends (
  ...argList: [infer T]
) => any //
  ? T
  : never; // not a function

/**
 * `TAwaitedReturnType<(...) => Promise<T>>` -> `T`
 */
export type TAwaitedReturnType<Fn extends TCallable> = Awaited<ReturnType<Fn>>;

/**
 * `TSpreadObject<A, B>` -> `typeof {...A, ...B}`
 */
export type TSpreadObject<A extends object, B extends object> = B &
  Omit<A, keyof B>;

/**
 * Companion for `exactOptionalPropertyTypes: true` tsconfig
 *
 * `TAllowUndefinedOnOptionalProperties<{ foo?: T }>` -> `{ foo?: T | undefined }`
 */
export type TAllowUndefinedOnOptionalProperties<T extends object> = {
  [K in keyof T]: undefined extends T[K] ? T[K] | undefined : T[K];
};

export type TEither<T> = { must: () => T } & (
  | { ok: false; result: null; error: Error }
  | { ok: true; result: T; error: null }
);
