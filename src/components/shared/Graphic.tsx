import { Circle, SvgProps } from "react-native-svg";

import { Color, styled } from "@/theme";

export const Graphic = styled(Circle)<SvgProps & { color?: Color }>`
  width: 100%;
  height: auto;
  max-width: 100%;
  align-items: center;
  color: ${({ color, theme }) =>
    color ? theme.color[color] : theme.color.black};
`;
