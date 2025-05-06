export const splitByMultipleMarkers = (
  str: string,
  targetsArray: string[]
): string[] => {
  if (!targetsArray.length) return [str];
  const [firstMarker, ...restMarkers] = targetsArray;
  const firstSplit = str.split(firstMarker);
  const data = firstSplit.flatMap(segment =>
    splitByMultipleMarkers(segment, restMarkers)
  );
  return data;
};

export const toCamelCase = (
  input: string,
  delimiter: string,
  capitalizeFirst: boolean
): string => {
  return input
    .toLowerCase()
    .split(delimiter)
    .map((word, index) =>
      index === 0 && !capitalizeFirst
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
};

export const capitalizeFirst = (str: string): string =>
  str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
