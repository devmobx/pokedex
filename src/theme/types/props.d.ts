import { ViewStyle } from "react-native";

import { BorderSize, Color, Radius, Spacing } from "./theme";

// --- WIDTH & HEIGHT ---
export type WidthProps =
  | { fullWidth?: true; width?: never }
  | { fullWidth?: false; width?: number | string };

export type HeightProps =
  | { fullHeight?: true; height?: never }
  | { fullHeight?: false; height?: number | string };

// --- POSITIONING ---
export type PositionProps = {
  position?: ViewStyle["position"];
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

// --- FLEXBOX ---
export type FlexProps = {
  flex?: ViewStyle["flex"];
  flexDirection?: ViewStyle["flexDirection"];
  alignItems?: ViewStyle["alignItems"];
  justifyContent?: ViewStyle["justifyContent"];
  flexWrap?: ViewStyle["flexWrap"];
  alignSelf?: ViewStyle["alignSelf"];
};

// --- BORDER & BACKGROUND ---
export type ViewStyleProps = {
  backgroundColor?: Color;
  borderRadius?: Radius;
  borderColor?: Color;
  borderWidth?: BorderSize;
  borderTopLeftRadius?: Radius;
  borderTopRightRadius?: Radius;
  borderBottomLeftRadius?: Radius;
  borderBottomRightRadius?: Radius;
};

// --- SPACING ---
export type MarginSpacing = Spacing | "auto";

export type SpacingProps = {
  margin?: MarginSpacing;
  marginTop?: MarginSpacing;
  marginBottom?: MarginSpacing;
  marginLeft?: MarginSpacing;
  marginRight?: MarginSpacing;
  marginHorizontal?: MarginSpacing;
  marginVertical?: MarginSpacing;

  padding?: Spacing;
  paddingTop?: Spacing;
  paddingBottom?: Spacing;
  paddingLeft?: Spacing;
  paddingRight?: Spacing;
  paddingHorizontal?: Spacing;
  paddingVertical?: Spacing;
};
