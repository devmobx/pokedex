import { Stack } from "expo-router";
import "react-native-reanimated";

import { useHeaderConfig } from "@/navigation";
import { useTheme } from "@/theme";

export default function PokemonLayout() {
  const headerConfig = useHeaderConfig();
  const theme = useTheme();

  return (
    <Stack screenOptions={headerConfig}>
      <Stack.Screen
        name="details"
        options={{ headerTintColor: theme.color.white }}
      />
    </Stack>
  );
}
