import { useLocalSearchParams } from "expo-router";
import { PokeAPI } from "pokeapi-types";
import { Image } from "react-native";

import { usePokemonStore } from "@/_zustand";
import PokeballBg from "@/assets/svg/pokeball_bg.svg";
import { DetailsContentSlider } from "@/components/app/Main/Pokemon/Details";
import {
  Box,
  FontText,
  Graphic,
  PokeballBgScreenContent,
  Screen
} from "@/components/shared";
import { PokemonProp } from "@/types/props";
import { capitalizeFirst } from "@/utils";

export type PokeDetailsParams = {
  index: string;
  listType: "pagination" | "searchResults";
};

type PokemonListTypeGetters = Record<
  PokeDetailsParams["listType"],
  () => PokeAPI.Pokemon
>;

export default function DetailsScreen() {
  const { index, listType } = useLocalSearchParams<PokeDetailsParams>();
  const paginationList = usePokemonStore.use.paginationList();
  const searchResults = usePokemonStore.use.searchResults();

  const pokemonListTypeGetters: PokemonListTypeGetters = {
    pagination: () => paginationList[Number(index)],
    searchResults: () => searchResults[Number(index)]
  };

  const pokemon = pokemonListTypeGetters[listType]();

  return (
    <Screen.Container bgColor="grey6">
      <PokeballBgScreenContent>
        <Screen.Content headerShown>
          <Header pokemon={pokemon} />
        </Screen.Content>
      </PokeballBgScreenContent>
      <DetailsContentSlider pokemon={pokemon} />
    </Screen.Container>
  );
}

const Header = ({ pokemon }: PokemonProp) => {
  return (
    <>
      <Box
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
    </>
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
