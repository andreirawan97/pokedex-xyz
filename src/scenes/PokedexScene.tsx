import { css } from "@emotion/css";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ArrowBack as ArrowBackIcon } from "react-ionicons";

import { colors } from "../constants/colors";
import { Loading, Row, Text } from "../core-ui";
import { FONT_SIZE } from "../constants/style";
import { GET_POKEMONS } from "../graphql/server/getPokemons";
import {
  GetPokemons,
  GetPokemonsVariables,
  GetPokemons_pokemon_v2_pokemon,
} from "../generated/server/GetPokemons";
import { PokemonSelection } from "../components";
import { pokedexImage } from "../assets";
import { useState } from "react";
import { SCENE_NAME } from "../constants/navigation";

export default function PokedexScene() {
  const history = useHistory();

  const [currentPageIndex, setCurrentPageIndex] = useState(0); // Page is Offset * 10. Page 0 is page 1

  const { data, loading } = useQuery<GetPokemons, GetPokemonsVariables>(
    GET_POKEMONS,
    {
      variables: {
        offset: currentPageIndex * 10,
      },
    }
  );

  const onClickNext = () => {
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const onClickBack = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const onClickPokemon = (pokemon: GetPokemons_pokemon_v2_pokemon) => {
    history.push(`${SCENE_NAME.pokemonDetail}${pokemon.name}`);
  };

  return (
    <div className={styles.root}>
      <div className={styles.headerContainer}>
        <div>
          <ArrowBackIcon
            color={colors.darkGrey}
            width="28px"
            height="28px"
            cssClasses={styles.backButton}
            onClick={history.goBack}
          />
          <Text className={styles.headerTitle}>Pokédex</Text>
        </div>

        <img alt="" src={pokedexImage} width={65} height={65} />
      </div>

      <div className={styles.pokemonListContainer}>
        {data?.pokemon_v2_pokemon.map((pokemon) => (
          <div className={styles.pokemonSelectionContainer}>
            <PokemonSelection
              onClick={() => onClickPokemon(pokemon)}
              pokemon={pokemon}
            />
          </div>
        ))}
      </div>

      <Row className={styles.pageButtonContainer}>
        {!loading && data && currentPageIndex > 0 && (
          <div className={styles.pageButton} onClick={onClickBack}>
            <Text className={styles.pageButtonText}>Back</Text>
          </div>
        )}
        {!loading && data && currentPageIndex !== 96 && (
          <div className={styles.pageButton} onClick={onClickNext}>
            <Text className={styles.pageButtonText}>Next</Text>
          </div>
        )}
      </Row>

      <Loading loading={loading} />
    </div>
  );
}

const styles = {
  root: css({
    width: "100vw",
    marginTop: 56,
    marginBottom: 56,
    marginLeft: 8,
    marginRight: 8,
  }),
  backButton: css({
    marginBottom: 12,
    marginLeft: -4,
    cursor: "pointer",
  }),
  headerTitle: css({
    fontSize: FONT_SIZE.extraLarge,
    fontWeight: "bold",
  }),
  headerContainer: css({
    marginBottom: 18,
    marginLeft: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  pokemonListContainer: css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  }),
  pokemonSelectionContainer: css({
    width: "50%",
    paddingBottom: 16,
    display: "flex",
  }),
  pageButton: css({
    backgroundColor: colors.crimson,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 21,
    paddingRight: 21,
    borderRadius: 4,
    marginRight: 8,
    marginLeft: 8,
    marginBottom: 56,
    cursor: "pointer",
  }),
  pageButtonText: css({
    fontSize: FONT_SIZE.medium,
    color: colors.white,
  }),
  pageButtonContainer: css({
    marginTop: 12,
    justifyContent: "center",
  }),
};
