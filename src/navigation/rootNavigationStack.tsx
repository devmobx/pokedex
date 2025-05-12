import { Stack } from "expo-router";

import { useHeaderConfig } from "./hooks";

export const RootNavigationStack = () => {
  const headerConfig = useHeaderConfig();

  return (
    <Stack screenOptions={headerConfig}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};
