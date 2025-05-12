import { ViewProps, ViewStyle } from "react-native";

import { Color, SpacingProps, styled } from "@/theme";
import { createSpacingStyles } from "@/theme/utils";

type WidthProps =
  | { fullWidth?: true; width?: never }
  | { fullWidth?: false; width?: number | string };

type HeightProps =
  | { fullHeight?: true; height?: never }
  | { fullHeight?: false; height?: number | string };

type PositionProps = {
  position?: ViewStyle["position"];
  top?: ViewStyle["top"];
  left?: ViewStyle["left"];
  right?: ViewStyle["right"];
  bottom?: ViewStyle["bottom"];
};

type FlexProps = {
  flex?: ViewStyle["flex"];
  flexDirection?: ViewStyle["flexDirection"];
  alignItems?: ViewStyle["alignItems"];
  justifyContent?: ViewStyle["justifyContent"];
  flexWrap?: ViewStyle["flexWrap"];
  alignSelf?: ViewStyle["alignSelf"];
};

export type WrapperProps = ViewProps &
  SpacingProps &
  WidthProps &
  HeightProps &
  PositionProps &
  FlexProps & {
    backgroundColor?: Color;
  };

export const Wrapper = styled.View<WrapperProps>`
  ${({ backgroundColor, theme }) =>
    backgroundColor ? `background-color: ${theme.color[backgroundColor]};` : ""}

  ${({ fullWidth, width }) =>
    fullWidth
      ? `width: 100%;`
      : width !== undefined
      ? `width: ${typeof width === "number" ? `${width}px` : width};`
      : ""}

  ${({ fullHeight, height }) =>
    fullHeight
      ? `height: 100%;`
      : height !== undefined
      ? `height: ${typeof height === "number" ? `${height}px` : height};`
      : ""}

  ${({ position }) => (position ? `position: ${position};` : "")}
  ${({ top }) => (top !== undefined ? `top: ${top}px;` : "")}
  ${({ right }) => (right !== undefined ? `right: ${right}px;` : "")}
  ${({ bottom }) => (bottom !== undefined ? `bottom: ${bottom}px;` : "")}
  ${({ left }) => (left !== undefined ? `left: ${left}px;` : "")}

  ${({ flex }) => (flex !== undefined ? `flex: ${flex};` : "")}
  ${({ flexDirection }) =>
    flexDirection ? `flex-direction: ${flexDirection};` : ""}
  ${({ alignItems }) => (alignItems ? `align-items: ${alignItems};` : "")}
  ${({ justifyContent }) =>
    justifyContent ? `justify-content: ${justifyContent};` : ""}
  ${({ flexWrap }) => (flexWrap ? `flex-wrap: ${flexWrap};` : "")}
  ${({ alignSelf }) => (alignSelf ? `align-self: ${alignSelf};` : "")}

  ${({ theme, ...props }) => createSpacingStyles(props, theme)}
`;
