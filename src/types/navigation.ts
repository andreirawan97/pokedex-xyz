export type PokemonDetailSceneParams = {
  pokemonId: string | undefined;
};

export type PokemonDetailSceneNavigationState = {
  lastPageIndex: number | undefined;
};

export type PokedexSceneNavigationState = {
  lastPageIndexFromPokemonDetail: number | undefined;
};
