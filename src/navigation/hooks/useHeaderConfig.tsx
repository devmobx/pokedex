import { useRouter } from "expo-router";

import { useTheme } from "@/theme";

import { HeaderLeftButton } from "../components";

type HeaderLeftProps = {
  canGoBack: boolean;
};

export const useHeaderConfig = () => {
  const theme = useTheme();
  const router = useRouter();

  return {
    headerShown: true,
    headerTransparent: true,
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: "transparent",
      elevation: 0
    },
    headerLeft: ({ canGoBack }: HeaderLeftProps) =>
      canGoBack ? <HeaderLeftButton onPress={() => router.back()} /> : null,
    headerTitle: "",
    headerTintColor: theme.color.contrast,
    headerBackTitleVisible: false,
    headerBackButtonDisplayMode: "minimal"
  };
};
