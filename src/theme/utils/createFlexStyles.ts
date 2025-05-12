import { css } from "styled-components/native";

import { FlexProps } from "../types/props";

export const createFlexStyles = (props: FlexProps): ReturnType<typeof css> => {
  const {
    flex,
    flexDirection,
    alignItems,
    justifyContent,
    flexWrap,
    alignSelf
  } = props;

  return css`
    ${flex !== undefined && `flex: ${flex};`}
    ${flexDirection && `flex-direction: ${flexDirection};`}
    ${alignItems && `align-items: ${alignItems};`}
    ${justifyContent && `justify-content: ${justifyContent};`}
    ${flexWrap && `flex-wrap: ${flexWrap};`}
    ${alignSelf && `align-self: ${alignSelf};`}
  `;
};
