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
  const IMAGE_WIDTH = 120;
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
          {`${(() => {
            return `#${pokemon.id.toString().padStart(4, "0")}`;
          })()}`}
        </FontText>
      </Box>
      <Box flexDirection="row" justifyContent="space-between">
        <Box>
          {pokemon.abilities.map(({ ability }, i) => (
            <Ability data={ability} key={`${ability.name}-${i}`} />
          ))}
        </Box>
        <Box width={IMAGE_WIDTH} right={0}>
          <Box width={IMAGE_WIDTH} height={100}>
            <Image
              source={{
                uri: pokemon.sprites?.front_default
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
          <Box position="absolute" style={{ top: "-75%" }}>
            <Graphic color="white" as={PokeballBg} />
          </Box>
        </Box>
      </Box>
    </AnimatedPressable>
  );
};

type AbilityProps = {
  data: PokeAPI.PokemonAbility["ability"];
};

const Ability = ({ data }: AbilityProps) => {
  return (
    <Box
      backgroundColor="transparentGrey5"
      paddingHorizontal="md"
      paddingVertical="sm"
      borderRadius="full"
      marginBottom="sm"
    >
      <FontText color="grey1">{data.name}</FontText>
    </Box>
  );
};
