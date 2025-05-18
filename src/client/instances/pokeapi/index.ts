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
  const request = pokeapi.get<PokeAPI.Pokemon>(`/pokemon/${body.pokemon}`);
  handleAxiosRequest(request, handlers, ["ERR_BAD_REQUEST"]);
};
