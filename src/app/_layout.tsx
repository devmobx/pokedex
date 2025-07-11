import "react-native-reanimated";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import ToastBase, { ToastConfig } from "react-native-toast-message";

import { useThemeStore } from "@/_zustand";
import { Toast } from "@/components/shared";
import { getThemeByColorScheme, ThemeProvider, useLoadFonts } from "@/theme";

SplashScreen.preventAutoHideAsync();

export const toastConfig: ToastConfig = {
  error: props => <Toast {...props} />,
  success: props => <Toast {...props} />,
  warning: props => <Toast {...props} />,
  info: props => <Toast {...props} />
};

const RootNavigationStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="main" />
    </Stack>
  );
};

export default function RootLayout() {
  const colorScheme = useThemeStore.use.colorScheme();
  const fontsLoaded = useLoadFonts();

  if (fontsLoaded) {
    SplashScreen.hide();
  } else {
    return null;
  }

  return (
    <ThemeProvider theme={getThemeByColorScheme(colorScheme)}>
      <RootNavigationStack />
      <ToastBase config={toastConfig} />
    </ThemeProvider>
  );
}
