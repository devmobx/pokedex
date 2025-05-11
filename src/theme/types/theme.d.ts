import {
  InterVariant,
  InterVariantKey,
  PoppinsVariant,
  PoppinsVariantKey
} from "../constants/font";

export type ColorScheme = "light" | "dark";

export type FontFamily = "poppins" | "inter";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export type FontSize = "xs" | "sm" | "md" | "lg" | "xl";

export type BorderSize = "xs";

export type Spacing = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "none";

export type Radius = "sm" | "md" | "lg";

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
  radius: Record<Radius, number>;
  font: {
    inter: Record<InterVariantKey, InterVariant>;
    poppins: Record<PoppinsVariantKey, PoppinsVariant>;
  };
  size: {
    icon: Record<IconSize, number>;
    font: Record<FontSize, number>;
    border: Record<BorderSize, number>;
  };
};

declare module "styled-components/native" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
