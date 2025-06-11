import { PokeAPI } from "pokeapi-types";
import { useEffect, useState } from "react";

import { Pokeapi } from "@/client";
import { FontText, Screen } from "@/components/shared";
import { useTranslation } from "@/i18n/hooks";
import { PokemonProp } from "@/types/props";

export const AboutSlide = ({ pokemon }: PokemonProp) => {
  const [species, setSpecies] = useState<PokeAPI.PokemonSpecies>();
  const { language } = useTranslation();

  useEffect(() => {
    Pokeapi.getPokemonSpecies({
      body: { pokemon: String(pokemon.id) },
      onSuccess: res => {
        setSpecies(res.data);
      }
    });
  }, [pokemon]);

  return (
    <Screen.Container>
      {species?.flavor_text_entries.map((text, i) => {
        if (
          text.language.name === language &&
          text.version.name === "alpha-sapphire"
        ) {
          return (
            <FontText key={i}>
              {text.flavor_text.split("\n").join(" ")}
            </FontText>
          );
        }
        return null;
      })}
    </Screen.Container>
  );
};
