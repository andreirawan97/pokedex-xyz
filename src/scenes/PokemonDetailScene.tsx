import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import {
  GetPokemonDetail,
  GetPokemonDetailVariables,
} from "../generated/server/GetPokemonDetail";
import { GET_POKEMON_DETAIL } from "../graphql/server/getPokemonDetail";

import { PokemonDetailSceneParams } from "../types/navigation";

export default function PokemonDetailScene() {
  const { pokemonName } = useParams<PokemonDetailSceneParams>();

  const { data } = useQuery<GetPokemonDetail, GetPokemonDetailVariables>(
    GET_POKEMON_DETAIL,
    {
      variables: {
        pokemonName: pokemonName ? pokemonName : "",
      },
    }
  );

  const pokemonData = data?.pokemon_v2_pokemon[0];

  console.log(pokemonData);

  return (
    <div>
      <p>Poke Detail</p>
    </div>
  );
}
