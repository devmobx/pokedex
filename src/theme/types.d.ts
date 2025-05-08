import { tamaguiConfig } from "./tamagui.config";
type UiConfig = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends UiConfig {}
}
