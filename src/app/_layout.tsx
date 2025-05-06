import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// import { useNavigationLogger } from "@/navigation";
import { useLoadFonts } from "@/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // useNavigationLogger();
  const { fontsLoaded, loadFonts } = useLoadFonts();

  useEffect(() => {
    (async () => {
      await loadFonts();
    })();
  }, [loadFonts]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
