import { createFont } from "tamagui";

import { PoppinsName } from "@/assets/fonts/Poppins/nameMap";

import { fontSizes } from "../sizes";

export const bodyFont = createFont({
  family: "Poppins",
  size: fontSizes,
  face: {
    100: {
      normal: PoppinsName.Poppins_Thin,
      italic: PoppinsName.Poppins_ThinItalic
    },
    200: {
      normal: PoppinsName.Poppins_ExtraLight,
      italic: PoppinsName.Poppins_ExtraLightItalic
    },
    300: {
      normal: PoppinsName.Poppins_Light,
      italic: PoppinsName.Poppins_LightItalic
    },
    400: {
      normal: PoppinsName.Poppins_Regular,
      italic: PoppinsName.Poppins_Italic
    },
    500: {
      normal: PoppinsName.Poppins_Medium,
      italic: PoppinsName.Poppins_MediumItalic
    },
    600: {
      normal: PoppinsName.Poppins_SemiBold,
      italic: PoppinsName.Poppins_SemiBoldItalic
    },
    700: {
      normal: PoppinsName.Poppins_Bold,
      italic: PoppinsName.Poppins_BoldItalic
    },
    800: {
      normal: PoppinsName.Poppins_ExtraBold,
      italic: PoppinsName.Poppins_ExtraBoldItalic
    },
    900: {
      normal: PoppinsName.Poppins_Black,
      italic: PoppinsName.Poppins_BlackItalic
    }
  }
});
