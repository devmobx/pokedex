import { css } from "styled-components/native";

import { ViewStyleProps } from "../types/props";
import { Theme } from "../types/theme";

export const createBorderStyles = (
  props: ViewStyleProps,
  theme: Theme
): ReturnType<typeof css> => {
  const {
    borderColor,
    borderWidth,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius
  } = props;

  return css`
    ${borderColor && `border-color: ${theme.color[borderColor]};`}
    ${borderWidth && `border-width: ${theme.border.size[borderWidth]}px;`}
    ${borderRadius && `border-radius: ${theme.border.radius[borderRadius]}px;`}
    ${borderTopLeftRadius &&
    `border-top-left-radius: ${theme.border.radius[borderTopLeftRadius]}px;`}
    ${borderTopRightRadius &&
    `border-top-right-radius: ${theme.border.radius[borderTopRightRadius]}px;`}
    ${borderBottomLeftRadius &&
    `border-bottom-left-radius: ${theme.border.radius[borderBottomLeftRadius]}px;`}
    ${borderBottomRightRadius &&
    `border-bottom-right-radius: ${theme.border.radius[borderBottomRightRadius]}px;`}
  `;
};
