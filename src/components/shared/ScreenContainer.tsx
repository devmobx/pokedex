import React, { ComponentProps, ElementType } from "react";
import { Keyboard, Platform, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Spacing, styled } from "@/theme";

import { FocusAwareStatusBar } from "./FocusAwareStatusbar";

type BackgroundTypeProps = {
  backgroundType?: "default" | "muted" | "primary";
};

type ScrollableProps = {
  scrollable?: boolean;
};

type Props = {
  paddingHorizontal?: Spacing;
  centerContent?: boolean;
} & BackgroundTypeProps &
  ScrollableProps &
  ComponentProps<typeof SafeAreaView> & {
    dismissKeyboardOnPress?: boolean;
  };

const ScrollWrapper = styled(ScrollView).attrs(({ centerContent }) => ({
  contentContainerStyle: {
    flexGrow: 1,
    ...(centerContent ? { alignItems: "center" } : {})
  },
  keyboardShouldPersistTaps: "handled",
  bounces: false
}))`
  flex: 1;
`;

const Container = styled(SafeAreaView).attrs(props => ({
  edges: props.edges ?? []
}))<Props>`
  flex: 1;
  background-color: ${props => props.theme.color.background};
  ${({ centerContent }) => (centerContent ? "align-items: center;" : "")}
  ${({ paddingHorizontal, theme }) =>
    paddingHorizontal
      ? `padding-horizontal: ${theme.spacing[paddingHorizontal]}px;`
      : ""}
`;

const FlexOnePressable = styled(Pressable)`
  flex: 1;
`;

const AppStatusBar = styled(FocusAwareStatusBar).attrs<BackgroundTypeProps>(
  ({ theme }) => ({
    backgroundColor: theme.color.background
  })
)``;

type ScreenContainerProps<T extends ElementType> = ComponentProps<
  typeof Container
> & {
  as?: T;
};

export const ScreenContainer = <T extends ElementType = typeof SafeAreaView>({
  dismissKeyboardOnPress,
  scrollable = true,
  centerContent,
  children,
  ...props
}: ScreenContainerProps<T>) => {
  const content = scrollable ? (
    <ScrollWrapper centerContent={centerContent}>{children}</ScrollWrapper>
  ) : (
    children
  );
  return dismissKeyboardOnPress ? (
    <FlexOnePressable accessible={false} onPress={Keyboard.dismiss}>
      {Platform.OS === "ios" && <AppStatusBar />}
      <Container centerContent={scrollable ? false : centerContent} {...props}>
        {content}
      </Container>
    </FlexOnePressable>
  ) : (
    <>
      {Platform.OS === "ios" && <AppStatusBar />}
      <Container {...props}>{content}</Container>
    </>
  );
};
