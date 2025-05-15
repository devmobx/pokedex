import { create } from "axios";

import { Env } from "@/env";

import { handleApiCall } from "../../handlers";
import { RequestPayload } from "../../types";

const pokeapi = create({
  baseURL: Env.POKEAPI_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

export const getPokemon = ({
  body,
  ...handlers
}: RequestPayload<{ pokemon: string }, unknown>) =>
  handleApiCall(pokeapi.get(`/pokemon/${body.pokemon}`), handlers);
