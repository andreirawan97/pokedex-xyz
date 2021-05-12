export function getDataFromStorage(key: string) {
  return localStorage.getItem(key);
}

export function setDataToStorage(key: string, value: unknown) {
  localStorage.setItem(key, String(value));
}
