import { gql } from "@apollo/client";

export const GET_POKEMON_ID = gql`
  query GetPokemonId($pokemonName: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $pokemonName } }) {
      name
      id
    }
  }
`;
