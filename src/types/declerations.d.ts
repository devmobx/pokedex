declare module "*.jpg" {
  import { ImageSourcePropType } from "react-native";
  const source: ImageSourcePropType;
  export default source;
}

declare module "*.jpeg" {
  import { ImageSourcePropType } from "react-native";
  const source: ImageSourcePropType;
  export default source;
}

declare module "*.png" {
  import { ImageSourcePropType } from "react-native";
  const source: ImageSourcePropType;
  export default source;
}

declare module "*.svg" {
  import { FC } from "react";
  import { SvgProps } from "react-native-svg";
  const content: FC<SvgProps>;
  export default content;
}

declare module "*.ttf" {
  import { FontSource } from "expo-font";
  const font: FontSource;
  export default font;
}
