import { PokeAPI } from "pokeapi-types";
import { Image } from "react-native";

import { AnimatedPressable, Box, FontText } from "@/components/shared";

type Props = {
  pokemon: PokeAPI.Pokemon;
};

export const PokemonCard = ({ pokemon }: Props) => {
  return (
    <AnimatedPressable
      borderRadius="xl"
      justifyContent="center"
      paddingHorizontal="md"
      paddingTop="lg"
      backgroundColor={"grey5"}
    >
      <Box fullWidth>
        <FontText>{pokemon.name}</FontText>
      </Box>
      <Image
        source={{
          uri: pokemon.sprites.front_default
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </AnimatedPressable>
  );
};
