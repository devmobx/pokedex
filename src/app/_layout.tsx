import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import ToastBase, { ToastConfig } from "react-native-toast-message";

import { useThemeStore } from "@/_zustand";
import { Toast } from "@/components/shared";
import { HeaderRightButton, useHeaderConfig } from "@/navigation";
import { getThemeByColorScheme, ThemeProvider, useLoadFonts } from "@/theme";

SplashScreen.preventAutoHideAsync();

export const toastConfig: ToastConfig = {
  error: props => <Toast {...props} />,
  success: props => <Toast {...props} />,
  warning: props => <Toast {...props} />,
  info: props => <Toast {...props} />
};

const RootNavigationStack = () => {
  const headerConfig = useHeaderConfig();

  return (
    <Stack screenOptions={headerConfig}>
      <Stack.Screen name="index" />
      <Stack.Screen name="test" options={{ headerRight: HeaderRightButton }} />
      <Stack.Screen name="(tabs)" />
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
