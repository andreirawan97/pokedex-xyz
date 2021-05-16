import { STORAGE_KEYS } from "../constants/storageKey";
import { MyPokemons } from "../types/globalTypes";
import { getDataFromStorage } from "./storage";

export default function checkDuplicatePokemon(name: string) {
  let myPokemons: MyPokemons = JSON.parse(
    getDataFromStorage(STORAGE_KEYS.myPokemons) ?? `[]`
  );

  let filteredMyPokemons = myPokemons.filter(
    (myPokemon) => myPokemon.nickname.toLowerCase() === name.toLowerCase()
  );
  return !!(filteredMyPokemons.length > 0);
}
