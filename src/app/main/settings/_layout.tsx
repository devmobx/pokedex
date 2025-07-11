import { Stack } from "expo-router";

import { useHeaderConfig } from "@/navigation";

export default function SettingsLayout() {
  const headerConfig = useHeaderConfig();
  return (
    <Stack screenOptions={headerConfig}>
      <Stack.Screen name="language" />
    </Stack>
  );
}
