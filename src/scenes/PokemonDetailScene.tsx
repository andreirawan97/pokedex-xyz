import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router";
import { css } from "@emotion/css";
import { ArrowBack as ArrowBackIcon } from "react-ionicons";
import { HashRouter as Router } from "react-router-dom";
import Lottie from "react-lottie";

import {
  GetPokemonDetail,
  GetPokemonDetailVariables,
} from "../generated/server/GetPokemonDetail";
import { GET_POKEMON_DETAIL } from "../graphql/server/getPokemonDetail";
import { PokemonDetailSceneParams } from "../types/navigation";
import { colors } from "../constants/colors";
import { Loading, Row, Text, TextField } from "../core-ui";
import { FONT_SIZE } from "../constants/style";
import { sanitizeName } from "../helpers/stringManipulation";
import {
  Modal,
  PokemonTypeChip,
  PokemonWeightHeight,
  Tabs,
} from "../components";
import { SCENE_NAME } from "../constants/navigation";
import { STORAGE_KEYS } from "../constants/storageKey";
import isPokemonCaught from "../helpers/isPokemonCaught";
import {
  pokeballImage,
  pokedexBackground,
  successCatchImage,
  failedCatchImage,
} from "../assets";
import { getDataFromStorage, setDataToStorage } from "../helpers/storage";
import { MyPokemons } from "../types/globalTypes";
import { successAnimation, swabluAnimation } from "../lottie";
import checkDuplicatePokemon from "../helpers/checkDuplicatePokemon";

import "./PokemonDetailScene.css";

export default function PokemonDetailScene() {
  const history = useHistory();
  const { pokemonId } = useParams<PokemonDetailSceneParams>();

  const [showSuccessModal, setSuccessModal] = useState(false);
  const [showFailedModal, setFailedModal] = useState(false);
  const [pokemonName, setPokemonName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSavedModal, setSavedModal] = useState(false);
  const [showCatchingModal, setCatchingModal] = useState(false);

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
  const pokemonMoves = data?.pokemon_v2_pokemonmove;

  const firstPokemonType =
    pokemonData?.pokemon_v2_pokemontypes[0].pokemon_v2_type?.name;
  const backgroundColor =
    // @ts-ignore
    colors.pokemonTypes[firstPokemonType ? firstPokemonType : "default"];

  const onCatchPokemon = () => {
    setCatchingModal(true);

    setTimeout(() => {
      setCatchingModal(false);
      setPokemonName(sanitizeName(pokemonData?.name));
      if (isPokemonCaught()) {
        setSuccessModal(true);
      } else {
        setFailedModal(true);
      }
    }, 1200);
  };

  const saveToMyPokemon = () => {
    let tmpMyPokemons: MyPokemons = JSON.parse(
      getDataFromStorage(STORAGE_KEYS.myPokemons) ?? `[]`
    );

    if (checkDuplicatePokemon(pokemonName.trim())) {
      setErrorMessage("Please choose a different pokemon name!");
    } else if (pokemonName.trim() === "") {
      setErrorMessage("Pokemon name cannot be empty!");
    } else {
      if (pokemonData) {
        setErrorMessage("");

        tmpMyPokemons.push({
          ...pokemonData,
          nickname: pokemonName,
        });

        setDataToStorage(
          STORAGE_KEYS.myPokemons,
          JSON.stringify(tmpMyPokemons)
        );
        setSuccessModal(false);
        setSavedModal(true);
      } else {
        setErrorMessage("Unknown error occured!");
      }
    }
  };

  const CatchingModalContent = () => (
    <div className={styles.catchResultModalContent}>
      <Lottie
        options={{ animationData: swabluAnimation }}
        width={150}
        height={150}
      />
      <Text className={styles.catchingText}>Catching pokemon...</Text>
    </div>
  );

  const SuccessModalContent = () => (
    <div className={styles.catchResultModalContent}>
      <img alt="" src={successCatchImage} className={styles.catchResultImage} />
      <Text className={styles.catchResultText}>Success!</Text>

      <TextField
        className={styles.inputPokemonName}
        value={pokemonName}
        onChangeText={setPokemonName}
        placeholder="Enter a pokemon name..."
      />

      <div className={styles.inputPokemonNameDivider} />

      <Text className={styles.successText}>was successfully caught!</Text>

      {errorMessage && (
        <Text className={styles.errorMessage}>{errorMessage}</Text>
      )}

      <Text className={styles.buttonSaveToMyPokemon} onClick={saveToMyPokemon}>
        Save to My Pokemon!
      </Text>
    </div>
  );

  const SavedModalContent = () => (
    <div className={styles.catchResultModalContent}>
      <Lottie
        options={{ loop: false, animationData: successAnimation }}
        width={200}
        height={200}
      />
      <Text className={styles.savedText}>Saved!</Text>

      <Text
        className={styles.buttonCloseModal}
        onClick={() => setSavedModal(false)}
      >
        Close
      </Text>
    </div>
  );

  const FailedModalContent = () => (
    <div className={styles.catchResultModalContent}>
      <img alt="" src={failedCatchImage} className={styles.catchResultImage} />
      <Text className={styles.catchResultText}>Failed!</Text>

      <Text
        className={styles.buttonCloseModal}
        onClick={() => setFailedModal(false)}
      >
        Close
      </Text>
    </div>
  );

  return (
    <div className={styles.root}>
      {pokemonData && (
        <div
          className={`${styles.headerContainer} ${css({ backgroundColor })}`}
        >
          <ArrowBackIcon
            color="rgba(255,255,255,0.7)"
            width="28px"
            height="28px"
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
          <Row
            className={`catch-button ${styles.buttonContainer}`}
            onClick={onCatchPokemon}
          >
            <img src={pokeballImage} className={styles.pokeball} alt="" />
            <Text className={styles.buttonText}>Catch!</Text>
          </Row>

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
                    <div className={styles.movesContainer}>
                      {pokemonMoves ? (
                        pokemonMoves.map((move) => (
                          <div>
                            <Text className={styles.moveName}>
                              {sanitizeName(move.pokemon_v2_move?.name)}
                            </Text>
                            <Row>
                              <Text className={styles.blueText}>Level: </Text>
                              <Text className={styles.levelText}>
                                {move.level}
                              </Text>
                              <Text className={styles.blueText}>Accuracy:</Text>
                              <Text className={styles.caption}>
                                {move.pokemon_v2_move?.accuracy}
                              </Text>
                            </Row>

                            <Text className={styles.moveFlavorText}>
                              {
                                move.pokemon_v2_move
                                  ?.pokemon_v2_moveflavortexts[0].flavor_text
                              }
                            </Text>

                            <div className={styles.moveDivider} />
                          </div>
                        ))
                      ) : (
                        <Text>No move found</Text>
                      )}
                    </div>
                  ),
                },
              ]}
            />
          </Router>
        </div>
      )}

      <Loading loading={loading} />

      <Modal
        contentContainerClassName={styles.catchResultModalContent}
        isShown={showCatchingModal}
        content={CatchingModalContent}
      />

      <Modal
        contentContainerClassName={styles.catchResultModalContent}
        isShown={showSuccessModal}
        content={SuccessModalContent}
      />

      <Modal
        contentContainerClassName={styles.catchResultModalContent}
        isShown={showSavedModal}
        content={SavedModalContent}
      />

      <Modal
        contentContainerClassName={styles.catchResultModalContent}
        isShown={showFailedModal}
        content={FailedModalContent}
      />
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
    marginTop: -10,
  }),
  contentContainer: css({
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.white,
    marginTop: -24,
    paddingTop: 48,
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
    width: 150,
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
  levelText: css({
    marginRight: 12,
    fontSize: FONT_SIZE.default,
  }),
  moveName: css({
    fontSize: FONT_SIZE.default,
    fontWeight: "bold",
  }),
  moveFlavorText: css({
    fontSize: FONT_SIZE.default,
    colors: "rgba(255,255,255,0.5)",
  }),
  moveDivider: css({
    height: 0.2,
    backgroundColor: "#a0a0a0",
    marginTop: 16,
    marginBottom: 16,
  }),
  movesContainer: css({
    marginBottom: 56,
  }),
  buttonContainer: css({
    borderRadius: 24,
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: colors.slateBlue,
    justifyContent: "center",
    marginBottom: -12,
    marginTop: -8,
    cursor: "pointer",
  }),
  buttonText: css({
    color: colors.white,
    fontWeight: "bold",
  }),
  pokeball: css({
    width: 24,
    height: 24,
    marginRight: 12,
  }),
  catchResultModalContent: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 16,
  }),
  catchResultImage: css({
    width: 100,
    height: 100,
  }),
  catchResultText: css({
    fontWeight: "bold",
    fontSize: FONT_SIZE.large,
  }),
  buttonCloseModal: css({
    fontWeight: "bold",
    color: colors.white,
    fontSize: FONT_SIZE.medium,
    marginTop: 36,
    cursor: "pointer",
    backgroundColor: colors.slateBlue,
    borderRadius: 24,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
  }),
  inputPokemonName: css({
    marginTop: 18,
    fontSize: FONT_SIZE.medium,
    fontWeight: "bold",
    color: colors.slateBlue,
  }),
  inputPokemonNameDivider: css({
    height: 2,
    backgroundColor: colors.slateBlue,
    marginBottom: 6,
  }),
  successText: css({
    fontSize: FONT_SIZE.default,
    marginBottom: 6,
  }),
  buttonSaveToMyPokemon: css({
    fontWeight: "bold",
    color: colors.white,
    fontSize: FONT_SIZE.medium,
    marginTop: 6,
    cursor: "pointer",
    backgroundColor: colors.slateBlue,
    borderRadius: 24,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
  }),
  errorMessage: css({
    fontSize: FONT_SIZE.default,
    color: colors.pastelRed,
    fontWeight: "bold",
  }),
  savedText: css({
    fontSize: FONT_SIZE.large,
    fontWeight: "bold",
    marginTop: -50,
  }),
  catchingText: css({
    fontWeight: "bold",
    fontSize: FONT_SIZE.large,
    marginTop: 8,
  }),
};
