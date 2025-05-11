export const objectKeysToKeyNames = <T extends object>(
  obj: T
): { [K in keyof T]: K } => {
  const keyMap = {} as { [K in keyof T]: K };
  for (const key in obj) keyMap[key] = key;
  return keyMap;
};
