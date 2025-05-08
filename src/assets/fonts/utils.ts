export const getFontNameMap = <T extends string>(
  font: Record<T, unknown>
): { [K in T]: K } => {
  const nameMap = {} as { [K in T]: K };
  for (const name in font) {
    nameMap[name as T] = name as T;
  }
  return nameMap;
};
