import { ViewProps } from "react-native";

import {
  BackgroundProp,
  BorderProps,
  css,
  FlexProps,
  HeightProps,
  PositionProps,
  SpacingProps,
  styled,
  WidthProps
} from "@/theme";
import {
  createBackgroundStyle,
  createBorderStyles,
  createFlexStyles,
  createPositionStyles,
  createSizeStyles,
  createSpacingStyles
} from "@/theme/utils";

export type BoxProps = Omit<ViewProps, "style"> &
  SpacingProps &
  WidthProps &
  HeightProps &
  PositionProps &
  FlexProps &
  BackgroundProp &
  BorderProps;

export const Box = styled.View<BoxProps>`
  ${({ theme, ...props }) => css`
    ${createSpacingStyles(props, theme)}
    ${createSizeStyles(props)}
    ${createPositionStyles(props)}
    ${createFlexStyles(props)}
    ${createBackgroundStyle(props, theme)}
    ${createBorderStyles(props, theme)}
  `}
`;
