import { Stack } from "expo-router";
import "react-native-reanimated";

import { useHeaderConfig } from "@/navigation";

export default function PokemonLayout() {
  const headerConfig = useHeaderConfig();

  return (
    <Stack screenOptions={headerConfig}>
      <Stack.Screen name="details" />
    </Stack>
  );
}
