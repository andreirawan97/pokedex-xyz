import { gql } from "@apollo/client";

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($pokemonId: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $pokemonId } }) {
      name
      id
      pokemon_v2_pokemontypes(distinct_on: id) {
        pokemon_v2_type {
          name
        }
      }
      height
      base_experience
      weight
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
    pokemon_v2_pokemonspeciesflavortext(
      where: { version_id: { _eq: 1 }, pokemon_species_id: { _eq: $pokemonId } }
    ) {
      id
      version_id
      pokemon_species_id
      flavor_text
    }
    pokemon_v2_pokemonmove(
      where: { version_group_id: { _eq: 3 }, pokemon_id: { _eq: $pokemonId } }
    ) {
      pokemon_v2_move {
        name
        accuracy
        pokemon_v2_moveflavortexts(
          where: { language_id: { _eq: 9 } }
          distinct_on: flavor_text
          limit: 1
        ) {
          flavor_text
        }
      }
      level
    }
    pokemon_v2_pokemonhabitat(
      where: {
        pokemon_v2_pokemonspecies: {
          pokemon_v2_pokemons: { id: { _eq: $pokemonId } }
        }
      }
    ) {
      name
    }
  }
`;
