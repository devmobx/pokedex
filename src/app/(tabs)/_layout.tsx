import { Tabs } from "expo-router";
import { House, IconProps } from "phosphor-react-native";

import { styled, useTheme } from "@/theme";

const TabBarIcon = styled(House).attrs<IconProps>(props => ({
  size: props.theme.icon.size.xl,
  ...props
}))``;

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.color.primary3,
        tabBarStyle: {
          height: 90,
          paddingTop: theme.spacing.xs
        },
        tabBarIconStyle: {
          marginBottom: theme.spacing.none
        },
        tabBarLabelStyle: {
          fontSize: theme.font.size.md,
          marginTop: theme.spacing.xxs,
          fontFamily: theme.font.family.inter["semi-bold"]
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }: IconProps) => <TabBarIcon color={color} />
        }}
      />
    </Tabs>
  );
}
