import { styled, useTheme, View } from "@tamagui/core";
import React, { ComponentProps, ElementType, ReactNode } from "react";
import {
  ColorValue,
  Keyboard,
  Platform,
  Pressable,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Theme } from "@/theme/types";

import { FocusAwareStatusBar } from "./FocusAwareStatusBar";

type ScrollableProps = {
  scrollable?: boolean;
};

type Props = ScrollableProps &
  ComponentProps<typeof SafeAreaView> & {
    dismissKeyboardOnPress?: boolean;
    children: ReactNode;
  };

type ScreenContainerProps<T extends ElementType> = ComponentProps<
  typeof Container
> & {
  as?: T;
};

type BackgroundColorProp = { backgroundColor: Theme };

const ScrollWrapper = styled(ScrollView, {
  name: "ScrollWrapper",
  flex: 1,
  contentContainerStyle: {
    flexGrow: 1
  },
  keyboardShouldPersistTaps: "handled",
  bounces: false
});

const Container = styled(SafeAreaView, {
  name: "Container",
  flex: 1
});

const FlexPressable = styled(Pressable, {
  name: "FlexPressable",
  flex: 1
});

const AppStatusBar = ({ backgroundColor }: BackgroundColorProp) => {
  const theme = useTheme();
  return (
    <FocusAwareStatusBar
      backgroundColor={theme[backgroundColor] as unknown as ColorValue}
    />
  );
};

export const ScreenContainer = <T extends ElementType = typeof SafeAreaView>({
  dismissKeyboardOnPress,
  scrollable = true,
  backgroundColor = "$background",
  edges,
  children,
  ...props
}: ScreenContainerProps<T>) => {
  const content = scrollable ? (
    <ScrollWrapper>{children}</ScrollWrapper>
  ) : (
    children
  );

  const Wrapper = dismissKeyboardOnPress ? FlexPressable : View;

  return (
    <Wrapper
      flex={1}
      accessible={false}
      onPress={dismissKeyboardOnPress ? Keyboard.dismiss : undefined}
    >
      {Platform.OS === "ios" && (
        <AppStatusBar backgroundColor={backgroundColor as Theme} />
      )}
      <Container
        {...props}
        backgroundColor={backgroundColor}
        edges={edges ?? []}
      >
        {content}
      </Container>
    </Wrapper>
  );
};
