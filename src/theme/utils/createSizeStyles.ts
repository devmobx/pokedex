import { css } from "styled-components/native";

import { HeightProps, WidthProps } from "../types/props";

export const createSizeStyles = (
  props: WidthProps & HeightProps
): ReturnType<typeof css> => {
  const { fullWidth, width, fullHeight, height } = props;

  const w = fullWidth
    ? "100%"
    : width !== undefined
    ? typeof width === "number"
      ? `${width}px`
      : width
    : undefined;
  const h = fullHeight
    ? "100%"
    : height !== undefined
    ? typeof height === "number"
      ? `${height}px`
      : height
    : undefined;

  return css`
    ${w && `width: ${w};`}
    ${h && `height: ${h};`}
  `;
};
