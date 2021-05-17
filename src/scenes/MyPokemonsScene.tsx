import { css } from "@emotion/css";
import { useHistory } from "react-router";
import { ArrowBack as ArrowBackIcon } from "react-ionicons";

import { bellsproutImage, myPokemonImage } from "../assets";
import { colors } from "../constants/colors";
import { SCENE_NAME } from "../constants/navigation";
import { STORAGE_KEYS } from "../constants/storageKey";
import { Text } from "../core-ui";
import { getDataFromStorage, setDataToStorage } from "../helpers/storage";
import { FONT_SIZE } from "../constants/style";
import { PokemonSelection } from "../components";
import { GetPokemons_pokemon_v2_pokemon } from "../generated/server/GetPokemons";
import { useState } from "react";
import { MyPokemons } from "../types/globalTypes";

export default function MyPokemonsScene() {
  const history = useHistory();

  const [myPokemons, setMyPokemons] = useState<MyPokemons>(
    JSON.parse(getDataFromStorage(STORAGE_KEYS.myPokemons) ?? `[]`)
  );

  const onClickPokemon = (pokemon: GetPokemons_pokemon_v2_pokemon) => {
    history.replace(`${SCENE_NAME.pokemonDetail}${pokemon.id}`);
  };

  const onClickRelease = (index: number) => {
    let tmpMyPokemons = myPokemons.filter((_, i) => i !== index);
    setMyPokemons(tmpMyPokemons);
    setDataToStorage(STORAGE_KEYS.myPokemons, JSON.stringify(tmpMyPokemons));
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
            }}
          />
          <Text className={styles.headerTitle}>My Pokemons</Text>
        </div>

        <img alt="" src={myPokemonImage} width={65} height={65} />
      </div>

      <div className={styles.pokemonListContainer}>
        {myPokemons &&
          myPokemons.map((pokemon, i) => (
            <div key={i} className={styles.pokemonSelectionContainer}>
              <PokemonSelection
                mode="myPokemons"
                onClick={() => onClickPokemon(pokemon)}
                onReleasePokemon={() => onClickRelease(i)}
                pokemon={pokemon}
              />
            </div>
          ))}

        {myPokemons.length === 0 && (
          <div className={styles.noPokemonContainer}>
            <img
              src={bellsproutImage}
              alt=""
              className={styles.bellsproutImage}
            />
            <Text className={styles.oops}>You have no Pokemon :(</Text>
            <Text className={styles.caption}>Go catch some in Pokédex</Text>
          </div>
        )}
      </div>
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
    marginBottom: 32,
    marginLeft: 16,
    marginRight: 16,
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
  noPokemonContainer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    marginTop: 24,
  }),
  bellsproutImage: css({
    width: 100,
    height: 100,
    marginBottom: 24,
  }),
  oops: css({
    fontWeight: "bold",
    fontSize: FONT_SIZE.extraLarge,
    marginBottom: 12,
  }),
  caption: css({
    textAlign: "center",
    marginBottom: 6,
  }),
};
