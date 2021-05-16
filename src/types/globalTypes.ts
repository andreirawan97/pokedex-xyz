import { GetPokemons_pokemon_v2_pokemon } from "../generated/server/GetPokemons";

export type TeamPreference = "mystic" | "valor" | "instinct" | null;

export type MyPokemons = Array<
  GetPokemons_pokemon_v2_pokemon & {
    nickname: string;
  }
>;
