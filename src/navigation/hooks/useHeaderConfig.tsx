import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import { useTheme } from "@/theme";

import { HeaderLeftButton } from "../components";

export const useHeaderConfig = () => {
  const theme = useTheme();

  return {
    headerShown: true,
    headerTransparent: true,
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: "transparent"
    },
    headerTitle: "",
    headerTintColor: theme.color.contrast,
    headerBackButtonDisplayMode: "minimal",
    headerLeft: HeaderLeftButton
  } satisfies NativeStackNavigationOptions;
};
