import { useLocalSearchParams } from "expo-router";
import { Image } from "react-native";

import { usePokemonStore } from "@/_zustand";
import PokeballBg from "@/assets/svg/pokeball_bg.svg";
import { DetailsContentSlider } from "@/components/app/Details";
import {
  Box,
  FontText,
  Graphic,
  PokeballBgScreenContent,
  Screen
} from "@/components/shared";
import { capitalizeFirst } from "@/utils";
import { PokemonProp } from "@/types/props";

export type PokeDetailsParams = {
  index: string;
  listType: "pagination" | "searchResults";
};

export default function DetailsScreen() {
  const { index, listType } = useLocalSearchParams<PokeDetailsParams>();
  const paginationList = usePokemonStore.use.paginationList();
  const searchResults = usePokemonStore.use.searchResults();

  const pokemonListTypeGetters = {
    pagination: () => paginationList[Number(index)],
    searchResults: () => searchResults[Number(index)]
  };

  const pokemon = pokemonListTypeGetters[listType]();

  return (
    <Screen.Container bgColor="grey6">
      <PokeballBgScreenContent>
        <Header pokemon={pokemon} />
      </PokeballBgScreenContent>
      <DetailsContentSlider pokemon={pokemon} />
    </Screen.Container>
  );
}

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
