import AsyncStorage from "@react-native-async-storage/async-storage";
import { PokeAPI } from "pokeapi-types";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { storeLogger } from "../middleware";
import { createSelectors } from "../utils";

type PokemonState = {
  currentPokemon: PokeAPI.Pokemon | undefined;
  pokemonList: PokeAPI.Pokemon[] | [];
  setCurrentPokemon: (pokemon: PokeAPI.Pokemon) => void;
  setPokemonList: (pokemonList: PokeAPI.Pokemon[]) => void;
};

export const pokemonStore = create<PokemonState>()(
  devtools(
    storeLogger(
      "POKEMON",
      persist(
        (set): PokemonState => ({
          currentPokemon: undefined,
          pokemonList: [],
          setCurrentPokemon: (pokemon: PokeAPI.Pokemon) => {
            set({ currentPokemon: pokemon }, false, "setCurrentPokemon");
          },
          setPokemonList: (pokemonList: PokeAPI.Pokemon[]) => {
            set({ pokemonList }, false, "setPokemonList");
          }
        }),
        {
          name: "pokemonStore",
          storage: createJSONStorage(() => AsyncStorage)
        }
      )
    )
  )
);

export const usePokemonStore = createSelectors(pokemonStore);
