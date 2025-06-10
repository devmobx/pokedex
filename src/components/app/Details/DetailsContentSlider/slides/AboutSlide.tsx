import { Box, FontText } from "@/components/shared";
import { PokemonProp } from "@/types/props";

export const AboutSlide = ({ pokemon }: PokemonProp) => {
  return (
    <Box padding="md">
      <FontText>{pokemon.name}</FontText>
    </Box>
  );
};
