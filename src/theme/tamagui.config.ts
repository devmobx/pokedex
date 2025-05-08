import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

import { bodyFont, headerFont } from "./values";

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  fonts: {
    body: bodyFont,
    heading: headerFont
  }
});
