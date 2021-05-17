import { STORAGE_KEYS } from "../constants/storageKey";

export function getDataFromStorage(key: string) {
  return localStorage.getItem(key);
}

export function setDataToStorage(key: string, value: unknown) {
  if (key === STORAGE_KEYS.myPokemons && String(value) === "") {
    localStorage.setItem(STORAGE_KEYS.myPokemons, String("[]"));
    return;
  }
  localStorage.setItem(key, String(value));
}
