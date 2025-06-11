import { Stack } from "expo-router";
import "react-native-reanimated";

export default function PokemonLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="details" />
    </Stack>
  );
}
