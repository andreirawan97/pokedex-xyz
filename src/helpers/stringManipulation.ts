export function capitilizedFirstLetter(str: string) {
  if (str && str[0]) {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
  } else {
    return "";
  }
}

// nidoran-male to Nidoran Male
export function sanitizeName(name: string) {
  return name
    .split("-")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}

// Nidoran Male to nidoran-male
export function desanitizeName(name: string) {
  return name
    .split(" ")
    .map((word) => {
      return word[0].toLowerCase() + word.substring(1);
    })
    .join("-");
}
