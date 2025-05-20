import { PokeAPI } from "pokeapi-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { storeLogger } from "../middleware";
import { createSelectors } from "../utils";

type PokemonState = {
  currentPokemon: PokeAPI.Pokemon | undefined;
  pokemonList: PokeAPI.Pokemon[] | [];
  paginationData: PokeAPI.NamedAPIResourceList | undefined;
  setCurrentPokemon: (pokemon: PokeAPI.Pokemon) => void;
  setPokemonList: (pokemonList: PokeAPI.Pokemon[]) => void;
  setPaginationData: (paginationData: PokeAPI.NamedAPIResourceList) => void;
};

export const pokemonStore = create<PokemonState>()(
  devtools(
    storeLogger(
      "POKEMON",
      (set): PokemonState => ({
        currentPokemon: undefined,
        pokemonList: [],
        paginationData: undefined,
        setCurrentPokemon: (pokemon: PokeAPI.Pokemon) => {
          set({ currentPokemon: pokemon }, false, "setCurrentPokemon");
        },
        setPokemonList: (pokemonList: PokeAPI.Pokemon[]) => {
          set({ pokemonList }, false, "setPokemonList");
        },
        setPaginationData: (paginationData: PokeAPI.NamedAPIResourceList) => {
          set({ paginationData }, false, "setPaginationData");
        }
      })
    )
  )
);

export const usePokemonStore = createSelectors(pokemonStore);
