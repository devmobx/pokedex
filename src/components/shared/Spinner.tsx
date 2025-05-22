import { Spinner as PhosphorSpinner } from "phosphor-react-native";
import React, { type ComponentProps, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";

import { styled } from "@/theme";

const Container = styled.View`
  height: 20px;
  width: 20px;
`;

export const SpinnerWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(PhosphorSpinner).attrs(props => ({
  size: props.size ?? 20
}))`
  color: ${props => props.theme.color.grey7};
`;

export const Spinner = (props: ComponentProps<typeof PhosphorSpinner>) => {
  const rotateAnim = useSharedValue(0);

  useEffect(() => {
    rotateAnim.value = withRepeat(
      withTiming(360, { duration: 1500, easing: Easing.linear }),
      -1,
      false
    );
  }, [rotateAnim]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateAnim.value}deg` }]
  }));

  return (
    <Container
      style={
        typeof props.size === "number"
          ? { height: props.size, width: props.size }
          : undefined
      }
    >
      <Animated.View style={animatedStyle}>
        <Icon {...props} />
      </Animated.View>
    </Container>
  );
};
