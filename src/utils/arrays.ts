export const toArray = <T>(value: T | T[] | undefined) =>
  value ? (Array.isArray(value) ? value : [value]) : [];
