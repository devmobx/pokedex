import React, { useCallback, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabBar, TabView } from "react-native-tab-view";

import { Box } from "@/components/shared";
import { useTheme } from "@/theme";
import { PokemonProp } from "@/types/props";

import { AboutSlide, EvolutionSlide, MovesSlide, StatsSlide } from "./slides";

export const DetailsContentSlider = ({ pokemon }: PokemonProp) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "about", title: "About" },
    { key: "stats", title: "Stats" },
    { key: "evolution", title: "Evolution" },
    { key: "moves", title: "Moves" }
  ]);

  const renderSlides = useCallback(
    ({ route }: { route: { key: string } }) => {
      switch (route.key) {
        case "about":
          return <AboutSlide pokemon={pokemon} />;
        case "stats":
          return <StatsSlide pokemon={pokemon} />;
        case "evolution":
          return <EvolutionSlide pokemon={pokemon} />;
        case "moves":
          return <MovesSlide pokemon={pokemon} />;
        default:
          return null;
      }
    },
    [pokemon]
  );

  return (
    <Box
      backgroundColor="background"
      height="55%"
      paddingTop="lg"
      paddingHorizontal="sm"
      style={{
        paddingBottom: insets.bottom,
        borderTopLeftRadius: theme.border.radius.xxl,
        borderTopRightRadius: theme.border.radius.xxl
      }}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderSlides}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props: Record<string, unknown>) => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: theme.color.male
            }}
            style={{ backgroundColor: "transparent" }}
            activeColor={theme.color.grey9}
            inactiveColor={theme.color.grey5}
            labelStyle={{
              fontFamily: theme.font.family.inter.bold
            }}
          />
        )}
      />
    </Box>
  );
};
