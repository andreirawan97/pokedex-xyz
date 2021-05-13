import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons($offset: Int!) {
    pokemon_v2_pokemon(limit: 10, offset: $offset) {
      name
      id
      pokemon_v2_pokemontypes(distinct_on: id) {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;
