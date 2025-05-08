import { createTamagui } from "@tamagui/core";

import { fonts } from "./fonts";
import { tokens } from "./tokens";

export const tamaguiConfig = createTamagui({
  fonts,
  tokens,
  themes: {
    light: {
      primary1: tokens.color.lightSchemePrimary1,
      primary2: tokens.color.lightSchemePrimary2,
      primary3: tokens.color.lightSchemePrimary3,
      primary4: tokens.color.lightSchemePrimary4,
      primary5: tokens.color.lightSchemePrimary5,
      primary6: tokens.color.lightSchemePrimary6,
      contrast: tokens.color.lightSchemeContrast,
      background: tokens.color.lightSchemeBackground,
      grey1: tokens.color.lightSchemeGrey1,
      male: tokens.color.lightSchemeMale,
      female: tokens.color.lightSchemeFemale
    },
    dark: {
      primary1: tokens.color.darkSchemePrimary1,
      primary2: tokens.color.darkSchemePrimary2,
      primary3: tokens.color.darkSchemePrimary3,
      primary4: tokens.color.darkSchemePrimary4,
      primary5: tokens.color.darkSchemePrimary5,
      primary6: tokens.color.darkSchemePrimary6,
      contrast: tokens.color.darkSchemeContrast,
      background: tokens.color.darkSchemeBackground,
      grey1: tokens.color.darkSchemeGrey1,
      male: tokens.color.darkSchemeMale,
      female: tokens.color.darkSchemeFemale
    }
  }
});
