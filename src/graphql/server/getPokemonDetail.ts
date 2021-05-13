import { gql } from "@apollo/client";

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($pokemonName: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $pokemonName } }) {
      name
      id
      pokemon_v2_pokemontypes(distinct_on: id) {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonmoves(
        distinct_on: id
        where: { pokemon_v2_versiongroup: { generation_id: { _eq: 1 } } }
      ) {
        level
        pokemon_v2_move {
          name
          accuracy
          pokemon_v2_moveflavortexts(
            where: { language_id: { _eq: 9 }, version_group_id: { _eq: 3 } }
          ) {
            flavor_text
          }
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
  }
`;
