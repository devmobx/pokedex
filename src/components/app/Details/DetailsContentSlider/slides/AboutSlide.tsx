import { PokeAPI } from "pokeapi-types";
import { useEffect, useState } from "react";

import { Pokeapi } from "@/client";
import { FontText, Screen } from "@/components/shared";
import { PokemonProp } from "@/types/props";

export const AboutSlide = ({ pokemon }: PokemonProp) => {
  const [species, setSpecies] = useState<PokeAPI.PokemonSpecies>();

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
      {species?.flavor_text_entries.map((text, i) => (
        <FontText key={i}>{text.flavor_text.split("\n").join(" ")}</FontText>
      ))}
    </Screen.Container>
  );
};
