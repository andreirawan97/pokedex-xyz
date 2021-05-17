import { STORAGE_KEYS } from "../constants/storageKey";
import { MyPokemons } from "../types/globalTypes";
import { getDataFromStorage } from "./storage";

export const getOwnedPokemonCount = (pokemonName: string) => {
  const tmpMyPokemons: MyPokemons = JSON.parse(
    getDataFromStorage(STORAGE_KEYS.myPokemons) ?? "[]"
  );
  return tmpMyPokemons.filter((myPokemon) => myPokemon.name === pokemonName)
    .length;
};
