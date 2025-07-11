import { Tabs } from "expo-router";
import { Alien, Gear, House, IconProps } from "phosphor-react-native";

import { useTranslation } from "@/i18n/hooks";
import { styled, useTheme } from "@/theme";

const TabBarIcon = styled(House).attrs<IconProps>(props => ({
  ...props,
  size: 35
}))``;

export default function TabLayout() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.color.grey1,
        tabBarInactiveTintColor: theme.color.grey5,
        tabBarStyle: {
          height: 90,
          paddingTop: theme.spacing.sm,
          backgroundColor: theme.color.contrast,
          shadowColor: theme.color.black,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8
        },
        tabBarIconStyle: {
          marginBottom: theme.spacing.none
        },
        tabBarLabelStyle: {
          fontSize: theme.font.size.sm,
          marginTop: theme.spacing.xs,
          fontFamily: theme.font.family.inter["semi-bold"]
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("base:home"),
          tabBarIcon: props => <TabBarIcon {...props} />
        }}
      />
      <Tabs.Screen
        name="pokemon"
        options={{
          title: t("base:pokemon"),
          tabBarIcon: props => <TabBarIcon as={Alien} {...props} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("base:settings"),
          tabBarIcon: props => <TabBarIcon as={Gear} {...props} />
        }}
      />
    </Tabs>
  );
}
