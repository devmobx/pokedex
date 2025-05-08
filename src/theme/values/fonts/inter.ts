import { createFont } from "tamagui";

import { InterName } from "@/assets/fonts/Inter/nameMap";

export const interFont = createFont({
  family: "Inter, Helvetica, Arial, sans-serif",
  size: {
    1: 12,
    2: 14,
    3: 15
  },
  lineHeight: {
    1: 17,
    2: 22,
    3: 25
  },
  weight: {
    4: "300",
    6: "600"
  },
  letterSpacing: {
    4: 0,
    8: -1
  },

  face: {
    700: { normal: InterName.Inter_Black, italic: InterName.Inter_BlackItalic }
  }
});
