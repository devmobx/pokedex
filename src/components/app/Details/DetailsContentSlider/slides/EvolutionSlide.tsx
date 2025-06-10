import { Box, FontText } from "@/components/shared";
import { PokemonProp } from "@/types/props";

export const EvolutionSlide = ({ pokemon }: PokemonProp) => {
  return (
    <Box padding="md">
      <FontText>{pokemon.name}</FontText>
    </Box>
  );
};
