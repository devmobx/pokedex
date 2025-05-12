import * as InterSource from "@/assets/fonts/Inter";
import * as PoppinsSource from "@/assets/fonts/Poppins";
import { objectKeysToKeyNames } from "@/utils";

import { Theme } from "../types/theme";

export const InterVariant = objectKeysToKeyNames(InterSource);
export type InterVariant = keyof typeof InterVariant;

export const PoppinsVariant = objectKeysToKeyNames(PoppinsSource);
export type PoppinsVariant = keyof typeof PoppinsVariant;

const inter = {
  thin: InterVariant.Inter_Thin,
  "thin-italic": InterVariant.Inter_ThinItalic,
  "extra-light": InterVariant.Inter_ExtraLight,
  "extra-light-italic": InterVariant.Inter_ExtraLightItalic,
  light: InterVariant.Inter_Light,
  "light-italic": InterVariant.Inter_LightItalic,
  regular: InterVariant.Inter_Regular,
  "regular-italic": InterVariant.Inter_Italic,
  medium: InterVariant.Inter_Medium,
  "medium-italic": InterVariant.Inter_MediumItalic,
  "semi-bold": InterVariant.Inter_SemiBold,
  "semi-bold-italic": InterVariant.Inter_SemiBoldItalic,
  bold: InterVariant.Inter_Bold,
  "bold-italic": InterVariant.Inter_BoldItalic,
  "extra-bold": InterVariant.Inter_ExtraBold,
  "extra-bold-italic": InterVariant.Inter_ExtraBoldItalic,
  black: InterVariant.Inter_Black,
  "black-italic": InterVariant.Inter_BlackItalic
};

export type InterVariantKey = keyof typeof inter;

const poppins = {
  thin: PoppinsVariant.Poppins_Thin,
  "thin-italic": PoppinsVariant.Poppins_ThinItalic,
  "extra-light": PoppinsVariant.Poppins_ExtraLight,
  "extra-light-italic": PoppinsVariant.Poppins_ExtraLightItalic,
  light: PoppinsVariant.Poppins_Light,
  "light-italic": PoppinsVariant.Poppins_LightItalic,
  regular: PoppinsVariant.Poppins_Regular,
  "regular-italic": PoppinsVariant.Poppins_Italic,
  medium: PoppinsVariant.Poppins_Medium,
  "medium-italic": PoppinsVariant.Poppins_MediumItalic,
  "semi-bold": PoppinsVariant.Poppins_SemiBold,
  "semi-bold-italic": PoppinsVariant.Poppins_SemiBoldItalic,
  bold: PoppinsVariant.Poppins_Bold,
  "bold-italic": PoppinsVariant.Poppins_BoldItalic,
  "extra-bold": PoppinsVariant.Poppins_ExtraBold,
  "extra-bold-italic": PoppinsVariant.Poppins_ExtraBoldItalic,
  black: PoppinsVariant.Poppins_Black,
  "black-italic": PoppinsVariant.Poppins_BlackItalic
};

export type PoppinsVariantKey = keyof typeof poppins;

export const font: Theme["font"] = {
  family: {
    inter,
    poppins
  },
  size: {
    xxs: 10,
    xs: 12,
    sm: 14,
    base: 16,
    md: 18,
    lg: 20,
    xl: 24,
    xxl: 30,
    display: 36,
    hero: 48
  },
  lineHeight: {
    xs: 18,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32
  }
} as const;
