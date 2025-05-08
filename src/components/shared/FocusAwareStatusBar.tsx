import { useFocusEffect } from "expo-router";
import { ComponentProps, useCallback, useState } from "react";
import { StatusBar } from "react-native";

export const FocusAwareStatusBar = (
  props: ComponentProps<typeof StatusBar>
) => {
  const [focused, setFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, [])
  );

  return focused ? <StatusBar {...props} /> : null;
};
