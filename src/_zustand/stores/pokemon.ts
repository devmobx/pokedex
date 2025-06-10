import { PokeAPI } from "pokeapi-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { storeLogger } from "../middleware";
import { createSelectors } from "../utils";

type PokemonState = {
  searchResults: PokeAPI.Pokemon[] | [];
  paginationList: PokeAPI.Pokemon[] | [];
  paginationData: PokeAPI.NamedAPIResourceList | undefined;
  setSearchResults: (searchResults: PokeAPI.Pokemon[]) => void;
  setPaginationList: (paginationList: PokeAPI.Pokemon[]) => void;
  setPaginationData: (paginationData: PokeAPI.NamedAPIResourceList) => void;
};

export const pokemonStore = create<PokemonState>()(
  devtools(
    storeLogger(
      "POKEMON",
      (set): PokemonState => ({
        searchResults: [],
        paginationList: [],
        paginationData: undefined,
        setSearchResults: searchResults => {
          set({ searchResults }, false, "setSearchResults");
        },
        setPaginationList: paginationList => {
          set({ paginationList }, false, "setPaginationList");
        },
        setPaginationData: paginationData => {
          set({ paginationData }, false, "setPaginationData");
        }
      })
    )
  )
);

export const usePokemonStore = createSelectors(pokemonStore);
