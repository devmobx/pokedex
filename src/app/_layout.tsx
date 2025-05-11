import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
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

export default function RootLayout() {
  // useNavigationLogger();
  const colorScheme = useThemeStore.use.colorScheme();
  const fontsLoaded = useLoadFonts();

  if (fontsLoaded) {
    SplashScreen.hide();
  } else {
    return null;
  }

  return (
    <ThemeProvider theme={getThemeByColorScheme(colorScheme)}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <ToastBase config={toastConfig} />
    </ThemeProvider>
  );
}
