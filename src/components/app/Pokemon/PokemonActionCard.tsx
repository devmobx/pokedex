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
      style={{ overflow: "hidden" }}
      onPress={onPress}
    >
      <FontText
        color="grey1"
        fontVariant="semi-bold"
        marginBottom="md"
        fontSize="md"
      >
        {capitalizeFirst(pokemon?.name)}
      </FontText>
      <Box flexDirection="row" justifyContent="space-between">
        <Box>
          {pokemon.abilities.map(({ ability }, i) => {
            return <Ability data={ability} key={`${ability.name}-${i}`} />;
          })}
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
    >
      <FontText color="grey1">{data.name}</FontText>
    </Box>
  );
};
