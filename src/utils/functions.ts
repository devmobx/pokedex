type Func<T extends unknown[], R> = (...args: T) => R;

export const memoize = <T extends unknown[], R>(fn: Func<T, R>): Func<T, R> => {
  let lastArgs: T | null = null;
  let lastResult: R | null = null;

  return (...args: T): R => {
    if (lastArgs && args.every((arg, index) => arg === lastArgs![index])) {
      return lastResult!;
    }
    lastArgs = args;
    lastResult = fn(...args);
    return lastResult;
  };
};
