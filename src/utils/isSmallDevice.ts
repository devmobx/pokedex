import { Dimensions } from "react-native";

export const isSmallDevice = () => {
  const { width, height } = Dimensions.get("window");
  return width <= 375 || height <= 667;
};
