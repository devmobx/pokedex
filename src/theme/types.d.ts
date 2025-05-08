import { tamaguiConfig } from "./tamagui.config";
type UiConfig = typeof tamaguiConfig;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends UiConfig {}
}

export type ColorScheme = "light" | "dark";

export type Theme = keyof typeof tamaguiConfig.themes.light;
