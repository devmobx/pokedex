import { createFont } from "tamagui";

import { InterName } from "@/assets/fonts/Inter/nameMap";

import { fontSizes } from "../sizes";

export const headerFont = createFont({
  family: "Inter",
  size: fontSizes,
  face: {
    100: {
      normal: InterName.Inter_Thin,
      italic: InterName.Inter_ThinItalic
    },
    200: {
      normal: InterName.Inter_ExtraLight,
      italic: InterName.Inter_ExtraLightItalic
    },
    300: {
      normal: InterName.Inter_Light,
      italic: InterName.Inter_LightItalic
    },
    400: {
      normal: InterName.Inter_Regular,
      italic: InterName.Inter_Italic
    },
    500: {
      normal: InterName.Inter_Medium,
      italic: InterName.Inter_MediumItalic
    },
    600: {
      normal: InterName.Inter_SemiBold,
      italic: InterName.Inter_SemiBoldItalic
    },
    700: {
      normal: InterName.Inter_Bold,
      italic: InterName.Inter_BoldItalic
    },
    800: {
      normal: InterName.Inter_ExtraBold,
      italic: InterName.Inter_ExtraBoldItalic
    },
    900: {
      normal: InterName.Inter_Black,
      italic: InterName.Inter_BlackItalic
    }
  }
});
