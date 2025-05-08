import { TamaguiProvider } from "@tamagui/core";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { tamaguiConfig, useLoadFonts } from "@/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const fontsLoaded = useLoadFonts();

  if (fontsLoaded) {
    SplashScreen.hide();
  } else {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  );
}
