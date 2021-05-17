import React, { useEffect } from "react";
import { css } from "@emotion/css";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  ArrowBack as ArrowBackIcon,
  ChevronBack as ChevronBackIcon,
  ChevronForward as ChevronForwardIcon,
  Shuffle as ShuffleIcon,
} from "react-ionicons";

import { colors } from "../constants/colors";
import { Loading, Row, Text } from "../core-ui";
import {
  FONT_SIZE,
  MEDIA_QUERY,
  RENDER_CONTAINER_WIDTH,
} from "../constants/style";
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

import "./PokedexScene.css";
import { getDataFromStorage, setDataToStorage } from "../helpers/storage";
import { STORAGE_KEYS } from "../constants/storageKey";

export default function PokedexScene() {
  const MAX_PAGE = 96;
  const history = useHistory();

  const [currentPageIndex, setCurrentPageIndex] = useState(
    getDataFromStorage(STORAGE_KEYS.lastPokedexIndex)
      ? Number(getDataFromStorage(STORAGE_KEYS.lastPokedexIndex))
      : 0
  ); // Page is Offset * 10. Page 0 is page 1

  const { data, loading } = useQuery<GetPokemons, GetPokemonsVariables>(
    GET_POKEMONS,
    {
      variables: {
        offset: currentPageIndex * 10,
      },
    }
  );

  useEffect(() => {
    if (currentPageIndex < 0) {
      setCurrentPageIndex(0);
      setDataToStorage(STORAGE_KEYS.lastPokedexIndex, 0);
    }
  }, [currentPageIndex]);

  useEffect(() => {
    setDataToStorage(STORAGE_KEYS.lastPokedexIndex, currentPageIndex);
  }, [currentPageIndex]);

  const onClickNext = () => {
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const onClickBack = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const onClickShuffle = () => {
    const randomPageIndex = Math.floor(Math.random() * MAX_PAGE);
    setCurrentPageIndex(randomPageIndex);
  };

  const onClickPokemon = (pokemon: GetPokemons_pokemon_v2_pokemon) => {
    history.replace(`${SCENE_NAME.pokemonDetail}${pokemon.id}`);
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
            onClick={() => {
              history.replace(SCENE_NAME.home);
              setDataToStorage(STORAGE_KEYS.lastPokedexIndex, 0);
            }}
          />
          <Text className={styles.headerTitle}>Pokédex</Text>
        </div>

        <img alt="" src={pokedexImage} width={65} height={65} />
      </div>

      <Text className={styles.pageNumber}>Page {currentPageIndex + 1}</Text>

      <div className={styles.pokemonListContainer}>
        {data?.pokemon_v2_pokemon.map((pokemon, i) => (
          <div key={i} className={styles.pokemonSelectionContainer}>
            <PokemonSelection
              onClick={() => onClickPokemon(pokemon)}
              pokemon={pokemon}
            />
          </div>
        ))}
      </div>

      {!loading && data && (
        <Row className={`shadow ${styles.pageButtonContainer}`}>
          <div
            className={styles.pageButton}
            onClick={() => currentPageIndex > 0 && onClickBack()}
          >
            <ChevronBackIcon color={colors.white} width="12px" />
            <Text className={styles.pageButtonText}>Back</Text>
          </div>

          <ShuffleIcon
            color={colors.white}
            width="28px"
            height="28px"
            cssClasses={styles.shuffle}
            onClick={onClickShuffle}
          />

          <div
            className={styles.pageButton}
            onClick={() => currentPageIndex !== MAX_PAGE && onClickNext()}
          >
            <Text className={styles.pageButtonText}>Next</Text>
            <ChevronForwardIcon color={colors.white} width="12px" />
          </div>
        </Row>
      )}

      <Text className={styles.easterEgg}>Easter Egg, lol</Text>
      <Text className={styles.easterEgg}>
        Somehow margin bottom didn't work here
      </Text>

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
    marginBottom: 12,
    marginLeft: 16,
    marginRight: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  pageNumber: css({
    fontWeight: "bold",
    fontSize: FONT_SIZE.large,
    marginLeft: 16,
    marginBottom: 12,
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
  }),
  pageButtonText: css({
    fontSize: FONT_SIZE.medium,
    color: colors.white,
  }),
  pageButtonContainer: css({
    marginTop: 12,
    justifyContent: "center",
    position: "absolute",
    alignItems: "center",
    bottom: 12,
    backgroundColor: colors.slateBlue,
    borderRadius: 18,
    height: 48,
    width: RENDER_CONTAINER_WIDTH - 18,
    [MEDIA_QUERY.maxWidth]: {
      width: "auto",
      left: 12,
      right: 12,
    },
  }),
  shuffle: css({
    marginLeft: 42,
    marginRight: 42,
    cursor: "pointer",
  }),
  easterEgg: css({
    color: colors.white,
    marginBottom: 20,
  }),
};
