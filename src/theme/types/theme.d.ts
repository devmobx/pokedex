import {
  InterVariant,
  InterVariantKey,
  PoppinsVariant,
  PoppinsVariantKey
} from "../constants/font";

export type ColorScheme = "light" | "dark";

export type FontFamily = "poppins" | "inter";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export type FontSize =
  | "xxs"
  | "xs"
  | "sm"
  | "base"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "display"
  | "hero";

export type BorderSize = "xs" | "sm" | "md" | "lg" | "xl";

export type Spacing = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "none";

export type Radius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export type LineHeight = "xs" | "sm" | "md" | "lg" | "xl";

export type Color =
  | "primary1"
  | "primary2"
  | "primary3"
  | "primary4"
  | "primary5"
  | "primary6"
  | "contrast"
  | "background"
  | "grey1"
  | "male"
  | "female"
  | "white"
  | "black"
  | "success"
  | "successTint"
  | "warning"
  | "warningTint"
  | "error"
  | "errorTint"
  | "neutral"
  | "neutralTint"
  | "shadow";

export type Theme = {
  color: Record<Color, string>;
  spacing: Record<Spacing, number>;
  border: {
    size: Record<BorderSize, number>;
    radius: Record<Radius, number>;
  };
  font: {
    family: {
      inter: Record<InterVariantKey, InterVariant>;
      poppins: Record<PoppinsVariantKey, PoppinsVariant>;
    };
    size: Record<FontSize, number>;
    lineHeight: Record<LineHeight, number>;
  };
  icon: {
    size: Record<IconSize, number>;
  };
};

declare module "styled-components/native" {
  export interface DefaultTheme extends Theme {}
}
