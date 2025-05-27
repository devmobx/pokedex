import { Stack } from "expo-router";
import "react-native-reanimated";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="poke-details" />
    </Stack>
  );
}
