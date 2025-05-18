import { AnimatedPressable } from "@/components/shared";

type Props = {
  pokemonData: unknown;
};

export const PokemonCard = ({ pokemonData }: Props) => {
  return (
    <AnimatedPressable
      height={90}
      borderRadius="xl"
      justifyContent="center"
      paddingHorizontal="md"
    ></AnimatedPressable>
  );
};
