export type PokemonDetailSceneParams = {
  searchQuery: string | undefined;
};

export type PokemonDetailSceneNavigationState = {
  lastPageIndex: number | undefined;
};

export type PokedexSceneNavigationState = {
  lastPageIndexFromPokemonDetail: number | undefined;
};
