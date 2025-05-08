import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

import { interFont } from "./values";

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  fonts: {
    body: interFont,
    heading: interFont
  }
});
