import { css } from "styled-components/native";

import { PositionProps } from "../types/props";

export const createPositionStyles = (
  props: PositionProps
): ReturnType<typeof css> => {
  const { position, top, right, bottom, left } = props;

  return css`
    ${position && `position: ${position};`}
    ${top !== undefined && `top: ${top}px;`}
    ${right !== undefined && `right: ${right}px;`}
    ${bottom !== undefined && `bottom: ${bottom}px;`}
    ${left !== undefined && `left: ${left}px;`}
  `;
};
