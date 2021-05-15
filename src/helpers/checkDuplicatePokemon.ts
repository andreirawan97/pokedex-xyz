import { STORAGE_KEYS } from "../constants/storageKey";
import { MyPokemon } from "../types/globalTypes";
import { getDataFromStorage } from "./storage";

export default function checkDuplicatePokemon(name: string) {
  let myPokemons: Array<MyPokemon> = JSON.parse(
    getDataFromStorage(STORAGE_KEYS.myPokemons) ?? "[]"
  );

  let filteredMyPokemons = myPokemons.filter(
    (myPokemon) => myPokemon.name.toLowerCase() === name.toLowerCase()
  );
  return !!(filteredMyPokemons.length > 0);
}
