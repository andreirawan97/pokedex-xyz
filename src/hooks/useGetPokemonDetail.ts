import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import {
  GetPokemonDetail,
  GetPokemonDetailVariables,
} from "../generated/server/GetPokemonDetail";
import {
  GetPokemonId,
  GetPokemonIdVariables,
} from "../generated/server/GetPokemonId";
import { GET_POKEMON_DETAIL } from "../graphql/server/getPokemonDetail";
import { GET_POKEMON_ID } from "../graphql/server/getPokemonId";

export default function useGetPokemonDetail(searchQuery: string | undefined) {
  const [data, setData] = useState<GetPokemonDetail>();
  const [loading, setLoading] = useState(false);

  const [getPokemonDetail] = useLazyQuery<
    GetPokemonDetail,
    GetPokemonDetailVariables
  >(GET_POKEMON_DETAIL, {
    onCompleted: (data) => {
      setData(data);
      setLoading(false);
    },
  });

  const [getPokemonId] = useLazyQuery<GetPokemonId, GetPokemonIdVariables>(
    GET_POKEMON_ID,
    {
      onCompleted: (data) => {
        const id =
          data.pokemon_v2_pokemon.length !== 0
            ? data.pokemon_v2_pokemon[0].id
            : 0;

        getPokemonDetail({
          variables: {
            pokemonId: id,
          },
        });
      },
    }
  );

  useEffect(() => {
    if (searchQuery) {
      const isSearchQueryANumber = !isNaN(parseInt(searchQuery));

      setLoading(true);
      if (isSearchQueryANumber) {
        getPokemonDetail({
          variables: {
            pokemonId: Number(searchQuery),
          },
        });
      } else {
        getPokemonId({
          variables: {
            pokemonName: searchQuery,
          },
        });
      }
    }
  }, [getPokemonDetail, getPokemonId, searchQuery]);

  return { data, loading };
}
