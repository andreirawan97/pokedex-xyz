import { css } from "@emotion/css";
import { useHistory } from "react-router";
import { ArrowBack as ArrowBackIcon } from "react-ionicons";

import { myPokemonImage } from "../assets";
import { colors } from "../constants/colors";
import { SCENE_NAME } from "../constants/navigation";
import { STORAGE_KEYS } from "../constants/storageKey";
import { Text } from "../core-ui";
import { getDataFromStorage } from "../helpers/storage";
import { FONT_SIZE } from "../constants/style";
import { PokemonSelection } from "../components";
import { GetPokemons_pokemon_v2_pokemon } from "../generated/server/GetPokemons";
import { useState } from "react";
import { MyPokemons } from "../types/globalTypes";

export default function MyPokemonsScene() {
  const history = useHistory();

  const [myPokemons] = useState<MyPokemons>(
    JSON.parse(getDataFromStorage(STORAGE_KEYS.myPokemons) ?? `[]`)
  );

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
                pokemon={pokemon}
              />
            </div>
          ))}
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
    marginBottom: 12,
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
};
