import axios, { AxiosResponse } from "axios";
import { PokeAPI } from "pokeapi-types";

import { Env } from "@/env";

import { handleAxiosRequest } from "../../handlers";
import { RequestPayload } from "../../types";

const pokeapi = axios.create({
  baseURL: Env.POKEAPI_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

type GetPokemonRequest = RequestPayload<
  { pokemon: string },
  AxiosResponse<PokeAPI.Pokemon>
>;

export const getPokemon = ({ body, ...handlers }: GetPokemonRequest) => {
  const pokemon = body.pokemon.length !== 0 ? body.pokemon : undefined;
  const request = pokeapi.get<PokeAPI.Pokemon>(`/pokemon/${pokemon}`);
  handleAxiosRequest(request, handlers, ["ERR_BAD_REQUEST"]);
};

type GetPaginatedPokemonListRequest = RequestPayload<
  { limit: number; offset: number },
  AxiosResponse<PokeAPI.Pokemon>
>;

export const getPaginatedPokemonList = ({
  body: { limit, offset },
  ...handlers
}: GetPaginatedPokemonListRequest) => {
  const params = new URLSearchParams();
  params.set("limit", limit.toString());
  params.set("offset", offset.toString());

  const request = pokeapi.get<PokeAPI.Pokemon>(
    `/pokemon/?${params.toString()}`
  );
  handleAxiosRequest(request, handlers);
};
