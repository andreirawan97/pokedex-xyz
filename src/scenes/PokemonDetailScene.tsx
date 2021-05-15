import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router";
import { css } from "@emotion/css";
import { ArrowBack as ArrowBackIcon } from "react-ionicons";
import { HashRouter as Router } from "react-router-dom";

import {
  GetPokemonDetail,
  GetPokemonDetailVariables,
} from "../generated/server/GetPokemonDetail";
import { GET_POKEMON_DETAIL } from "../graphql/server/getPokemonDetail";
import { PokemonDetailSceneParams } from "../types/navigation";
import { colors } from "../constants/colors";
import { Loading, Row, Text } from "../core-ui";
import { FONT_SIZE } from "../constants/style";
import { sanitizeName } from "../helpers/stringManipulation";
import { PokemonTypeChip, PokemonWeightHeight, Tabs } from "../components";
import { SCENE_NAME } from "../constants/navigation";
import { pokedexBackground } from "../assets";

import "./PokemonDetailScene.css";

export default function PokemonDetailScene() {
  const history = useHistory();

  const { pokemonId } = useParams<PokemonDetailSceneParams>();

  const { data, loading } = useQuery<
    GetPokemonDetail,
    GetPokemonDetailVariables
  >(GET_POKEMON_DETAIL, {
    variables: {
      pokemonId: Number(pokemonId),
    },
  });

  const pokemonData = data?.pokemon_v2_pokemon[0];
  const pokemonFlavorText = data?.pokemon_v2_pokemonspeciesflavortext[0];
  const pokemonHabitat = data?.pokemon_v2_pokemonhabitat[0];
  const firstPokemonType =
    pokemonData?.pokemon_v2_pokemontypes[0].pokemon_v2_type?.name;
  const backgroundColor =
    // @ts-ignore
    colors.pokemonTypes[firstPokemonType ? firstPokemonType : "default"];

  console.log(pokemonData);
  console.log(pokemonFlavorText);

  return (
    <div className={styles.root}>
      {pokemonData && (
        <div
          className={`${styles.headerContainer} ${css({ backgroundColor })}`}
        >
          <ArrowBackIcon
            color="rgba(255,255,255,0.7)"
            width="21px"
            cssClasses={styles.arrowBack}
            onClick={() => history.replace(SCENE_NAME.pokedex)}
          />

          <div className={styles.headerInfoContainer}>
            <Text className={styles.pokemonName}>
              {sanitizeName(pokemonData.name)}
            </Text>
            <Text className={styles.pokedexNumber}>#{pokemonData.id}</Text>
          </div>

          <Row>
            {pokemonData.pokemon_v2_pokemontypes.map((pokemonType, i) => (
              <PokemonTypeChip
                key={i}
                pokemonType={pokemonType.pokemon_v2_type?.name}
              />
            ))}
          </Row>

          <img
            alt=""
            src={`https://img.pokemondb.net/sprites/home/normal/${pokemonData.name}.png`}
            className={styles.pokemonImage}
          />
        </div>
      )}

      {pokemonData && (
        <div className={`shadow ${styles.contentContainer}`}>
          <Router>
            <Tabs
              items={[
                {
                  name: "About",
                  route: "about",
                  render: () => (
                    <div>
                      <Text className={styles.flavorText}>
                        {pokemonFlavorText
                          ? pokemonFlavorText.flavor_text
                          : "No description available"}
                      </Text>

                      <Row>
                        <Text className={styles.blueText}>Habitat:</Text>
                        <Text className={styles.caption}>
                          {pokemonHabitat
                            ? sanitizeName(pokemonHabitat.name)
                            : "No data"}
                        </Text>
                      </Row>

                      <div className={styles.weightHeightContainer}>
                        <PokemonWeightHeight
                          weight={pokemonData.weight}
                          height={pokemonData.weight}
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  name: "Stats",
                  route: "stats",
                  render: () => (
                    <div>
                      <Row className={styles.statRow}>
                        <Text className={styles.statTitle}>
                          Base Experience
                        </Text>
                        <Text>{pokemonData.base_experience}</Text>
                      </Row>
                      {pokemonData.pokemon_v2_pokemonstats.map((stat, i) => (
                        <Row className={styles.statRow} key={i}>
                          <Text className={styles.statTitle}>
                            {sanitizeName(stat.pokemon_v2_stat?.name)}
                          </Text>
                          <Text>{stat.base_stat}</Text>
                        </Row>
                      ))}
                    </div>
                  ),
                },
                {
                  name: "Moves",
                  route: "moves",
                  render: () => (
                    <div>
                      Inexpedient gains prejudice aversion pious snare noble
                      ocean ocean overcome self ubermensch prejudice philosophy.
                      Ocean strong sea burying reason ultimate burying spirit.
                      Pious christianity decieve endless abstract decrepit
                      abstract. Ocean burying depths evil horror suicide
                      mountains fearful depths christianity disgust gains
                      horror. Self marvelous passion faith against grandeur.
                    </div>
                  ),
                },
              ]}
            />
          </Router>
        </div>
      )}

      <Loading loading={loading} />
    </div>
  );
}

const styles = {
  root: css({
    width: "100vw",
  }),
  headerContainer: css({
    display: "flex",
    flexDirection: "column",
    paddingTop: 56,
    paddingLeft: 21,
    paddingRight: 21,
    backgroundImage: `url(${pokedexBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }),
  headerInfoContainer: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  }),
  pokemonName: css({
    fontWeight: "bold",
    color: colors.white,
    fontSize: FONT_SIZE.extraLarge,
  }),
  pokedexNumber: css({
    fontWeight: "bold",
    color: colors.white,
    fontSize: FONT_SIZE.large,
  }),
  arrowBack: css({
    marginBottom: 12,
    cursor: "pointer",
  }),
  pokemonImage: css({
    width: 180,
    height: 180,
    alignSelf: "center",
    zIndex: 1,
    marginTop: -32,
  }),
  contentContainer: css({
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.white,
    marginTop: -32,
    paddingTop: 12,
    paddingLeft: 33,
    paddingRight: 33,
    paddingBottom: 24,
  }),
  flavorText: css({
    fontSize: FONT_SIZE.default,
    marginBottom: 8,
  }),
  weightHeightContainer: css({
    display: "flex",
    justifyContent: "center",
    marginTop: 16,
  }),
  statTitle: css({
    width: "45%",
    color: colors.slateBlue,
    fontWeight: "bold",
  }),
  statRow: css({
    marginBottom: 6,
  }),
  blueText: css({
    fontSize: FONT_SIZE.default,
    color: colors.slateBlue,
    marginRight: 8,
    fontWeight: "bold",
  }),
  caption: css({
    fontSize: FONT_SIZE.default,
  }),
};
