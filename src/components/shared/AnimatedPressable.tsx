import React, { useCallback } from "react";
import { GestureResponderEvent, Pressable, PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

import { SpacingProps, styled } from "@/theme";
import { createSpacingStyles } from "@/theme/utils";

export type AnimatedPressableProps = PressableProps & {
  onPress?: ((event?: GestureResponderEvent) => void) | (() => Promise<void>);
} & SpacingProps;

const AnimatedPressableBody = Animated.createAnimatedComponent(Pressable);

const Body = styled(AnimatedPressableBody)`
  ${({ theme, ...props }) => createSpacingStyles(props, theme)};
`;

export const AnimatedPressable = ({
  children,
  onPress,
  style,
  ...props
}: AnimatedPressableProps) => {
  const pressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(pressed.value ? 0.3 : 1, { duration: 100 })
    };
  });

  const handlePressIn = useCallback(() => {
    pressed.value = true;
  }, [pressed]);

  const handlePressOut = useCallback(() => {
    pressed.value = false;
  }, [pressed]);

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (onPress) {
        onPress(event);
      }
    },
    [onPress]
  );

  return (
    <Body
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[style, animatedStyle]}
    >
      {children}
    </Body>
  );
};
