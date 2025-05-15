import { css } from "styled-components/native";

import { BackgroundProp } from "../types/props";
import { Theme } from "../types/theme";

export const createBackgroundStyle = (
  props: BackgroundProp,
  theme: Theme
): ReturnType<typeof css> => {
  const { backgroundColor } = props;

  return css`
    ${backgroundColor && `background-color: ${theme.color[backgroundColor]};`}
  `;
};
