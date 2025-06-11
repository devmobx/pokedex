import { PokeAPI } from "pokeapi-types";
import { Image } from "react-native";

import PokeballBg from "@/assets/svg/pokeball_bg.svg";
import { AnimatedPressable, Box, FontText, Graphic } from "@/components/shared";
import { capitalizeFirst } from "@/utils";

type Props = {
  pokemon: PokeAPI.Pokemon;
  onPress: () => void;
};

export const PokemonActionCard = ({ pokemon, onPress = () => null }: Props) => {
  return (
    <AnimatedPressable
      borderRadius="xl"
      paddingHorizontal="md"
      paddingVertical="md"
      backgroundColor="grey6"
      marginBottom="md"
      style={{ overflow: "hidden" }}
      onPress={onPress}
    >
      <PokemonHeader pokemon={pokemon} />
      <Box flexDirection="row" justifyContent="space-between">
        <PokemonAbilities pokemon={pokemon} />
        <Box flex={1} alignItems="flex-end" justifyContent="flex-end">
          <PokemonImage pokemon={pokemon} />
        </Box>
      </Box>
    </AnimatedPressable>
  );
};

type PokemonHeaderProps = {
  pokemon: PokeAPI.Pokemon;
};

const PokemonHeader = ({ pokemon }: PokemonHeaderProps) => {
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <FontText
        color="grey1"
        fontVariant="semi-bold"
        marginBottom="md"
        fontSize="md"
      >
        {capitalizeFirst(pokemon?.name)}
      </FontText>
      <FontText
        color="transparentGrey9"
        fontVariant="semi-bold"
        marginBottom="md"
        fontSize="md"
      >
        {`#${pokemon.id.toString().padStart(4, "0")}`}
      </FontText>
    </Box>
  );
};

type PokemonImageProps = {
  pokemon: PokeAPI.Pokemon;
};

export const PokemonImage = ({ pokemon }: PokemonImageProps) => {
  const IMAGE_WIDTH = 120;
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

type PokemonAbilitiesProps = {
  pokemon: PokeAPI.Pokemon;
};

const PokemonAbilities = ({ pokemon }: PokemonAbilitiesProps) => {
  return (
    <Box>
      {pokemon.abilities.map(({ ability }, i) => (
        <Box
          key={i}
          backgroundColor="transparentGrey5"
          paddingHorizontal="md"
          paddingVertical="sm"
          borderRadius="full"
          marginBottom="sm"
        >
          <FontText color="grey1">{ability.name}</FontText>
        </Box>
      ))}
    </Box>
  );
};
