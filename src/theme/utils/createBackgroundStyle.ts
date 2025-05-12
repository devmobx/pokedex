import { css } from "styled-components/native";

import { ViewStyleProps } from "../types/props";
import { Theme } from "../types/theme";

export const createBackgroundStyle = (
  props: ViewStyleProps,
  theme: Theme
): ReturnType<typeof css> => {
  const { backgroundColor } = props;

  return css`
    ${backgroundColor && `background-color: ${theme.color[backgroundColor]};`}
  `;
};
