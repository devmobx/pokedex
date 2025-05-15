import { Href, useRouter } from "expo-router";

import { Color } from "@/theme";

import { TextStyle } from "react-native";
import { AnimatedPressable, AnimatedPressableProps } from "./AnimatedPressable";
import { FontText } from "./FontText";

type Props = {
  route: Href;
  children: string;
  color?: Color;
  textAlign?: TextStyle["textAlign"];
} & Omit<AnimatedPressableProps, "onPress" | "fullWidth" | "fullHeight">;

export const Link = ({
  route,
  color,
  textAlign,
  children,
  ...props
}: Props) => {
  const router = useRouter();
  return (
    <AnimatedPressable {...props} onPress={() => router.push(route)}>
      <FontText color={color} {...(textAlign ? { textAlign } : {})}>
        {children}
      </FontText>
    </AnimatedPressable>
  );
};
