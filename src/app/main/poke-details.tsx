import { useLocalSearchParams, useRouter } from "expo-router";
import { PokeAPI } from "pokeapi-types";
import { Image } from "react-native";

import { usePokemonStore } from "@/_zustand";
import PokeballBg from "@/assets/svg/pokeball_bg.svg";
import {
  Box,
  FontText,
  Graphic,
  PokeballBgScreenContent,
  Screen
} from "@/components/shared";
import { useTranslation } from "@/i18n/hooks";
import { useTheme } from "@/theme";
import { capitalizeFirst } from "@/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PokeDetailsParams = {
  index: string;
};

type PokemonProp = {
  pokemon: PokeAPI.Pokemon;
};

export default function PokeDetailsScreen() {
  const { index } = useLocalSearchParams<PokeDetailsParams>();
  const pokemonList = usePokemonStore.use.pokemonList() as PokeAPI.Pokemon[];
  const pokemon = pokemonList[Number(index)];
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Screen.Container bgColor="grey6">
      <PokeballBgScreenContent>
        <Header pokemon={pokemon} />
      </PokeballBgScreenContent>
      <Details pokemon={pokemon} />
    </Screen.Container>
  );
}

const Details = ({ pokemon }: PokemonProp) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Box
      backgroundColor="grey1"
      height="50%"
      style={{
        paddingBottom: insets.bottom,
        borderTopLeftRadius: theme.border.radius.xxl,
        borderTopRightRadius: theme.border.radius.xxl
      }}
    ></Box>
  );
};

const Header = ({ pokemon }: PokemonProp) => {
  return (
    <Box flex={1} justifyContent="flex-start">
      <Box
        marginTop="xxl"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <FontText
          fontFamily="poppins"
          fontVariant="bold"
          color="grey1"
          fontSize="display"
        >
          {capitalizeFirst(pokemon.name)}
        </FontText>
        <FontText
          fontFamily="poppins"
          fontVariant="bold"
          fontSize="lg"
          color="grey1"
        >
          {`#${pokemon.id.toString().padStart(4, "0")}`}
        </FontText>
      </Box>
      <Box alignItems="center">
        <PokemonImage pokemon={pokemon} />
      </Box>
    </Box>
  );
};

export const PokemonImage = ({ pokemon }: PokemonProp) => {
  const IMAGE_WIDTH = 200;
  return (
    <Box width={IMAGE_WIDTH}>
      <Box width={IMAGE_WIDTH} height={IMAGE_WIDTH} position="relative">
        <Box position="absolute">
          <Graphic
            color="white"
            as={PokeballBg}
            width={IMAGE_WIDTH}
            height={IMAGE_WIDTH}
          />
        </Box>
        <Image
          source={{
            uri: pokemon.sprites?.front_default
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
    </Box>
  );
};
