import { useTheme } from "@/theme";

export const useHeaderConfig = () => {
  const theme = useTheme();

  return {
    headerShown: true,
    headerTransparent: true,
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: "transparent",
      elevation: 0
    },
    headerTitle: "",
    headerTintColor: theme.color.contrast,
    headerBackTitleVisible: false,
    headerBackButtonDisplayMode: "minimal"
  };
};
