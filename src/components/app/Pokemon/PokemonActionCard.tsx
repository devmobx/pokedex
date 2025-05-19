import { PokeAPI } from "pokeapi-types";
import { Image } from "react-native";

import { AnimatedPressable, Box, FontText } from "@/components/shared";

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
      backgroundColor={"grey6"}
      flexDirection="row"
      onPress={onPress}
    >
      <Box>
        <FontText color="grey1" fontVariant="semi-bold">
          {pokemon?.name}
        </FontText>
      </Box>
      <Box width={100} height={100}>
        <Image
          source={{
            uri: pokemon.sprites?.front_default
          }}
          style={{ width: "100%", height: "100%", backgroundColor: "red" }}
        />
      </Box>
    </AnimatedPressable>
  );
};
