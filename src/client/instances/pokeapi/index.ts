import axios from "axios";

import { Env } from "@/env";

import { handleApiCall } from "../../handlers";
import { RequestPayload } from "../../types";

const pokeapi = axios.create({
  baseURL: Env.POKEAPI_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

type GetPokemonRequest = RequestPayload<{ pokemon: string }, unknown>;

export const getPokemon = ({ body, ...handlers }: GetPokemonRequest) => {
  const request = pokeapi.get(`/pokemon/${body.pokemon}`);
  handleApiCall(request, handlers, ["ERR_BAD_REQUEST"]);
};
