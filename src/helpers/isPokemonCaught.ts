export default function isPokemonCaught() {
  const luckyChance = Number(Math.random().toPrecision(2));

  if (luckyChance < 0.5) {
    return true;
  } else {
    return false;
  }
}
