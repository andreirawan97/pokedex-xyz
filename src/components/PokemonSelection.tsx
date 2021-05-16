import { css } from "@emotion/css";
import { PokemonTypeChip } from ".";
import { Fade } from "react-reveal";

import { colors } from "../constants/colors";
import { FONT_SIZE } from "../constants/style";
import { Row, Text } from "../core-ui";
import { GetPokemons_pokemon_v2_pokemon } from "../generated/server/GetPokemons";
import { sanitizeName } from "../helpers/stringManipulation";

import "./PokemonSelection.css";

type Props = {
  pokemon: GetPokemons_pokemon_v2_pokemon;
  onClick?: (pokemonName: string) => void;
  mode?: "pokedex" | "myPokemons";
  onReleasePokemon?: (pokemonName: string) => void;
};

export default function PokemonSelection(props: Props) {
  const { onClick, pokemon, mode = "pokedex", onReleasePokemon } = props;

  const firstPokemonType =
    pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type?.name;

  const pokemonImageURI = `https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`;
  const backgroundColor =
    // @ts-ignore
    colors.pokemonTypes[firstPokemonType ? firstPokemonType : "default"];

  return (
    <Fade duration={600}>
      <div
        className={`pokemon-selection ${styles.container} ${css({
          backgroundColor,
        })}`}
        onClick={() => onClick && onClick(pokemon.name)}
      >
        <div
          className={
            mode === "pokedex"
              ? styles.contentContainer
              : styles.contentContainerCenter
          }
        >
          {mode === "pokedex" && (
            <Text className={styles.pokemonNumber}>#{pokemon.id}</Text>
          )}

          <img
            alt=""
            src={pokemonImageURI}
            width={mode === "pokedex" ? 65 : 80}
            height={mode === "pokedex" ? 65 : 80}
          />
        </div>

        <Text className={styles.pokemonName}>{sanitizeName(pokemon.name)}</Text>

        <Row>
          {pokemon.pokemon_v2_pokemontypes.map((pokemonType) => (
            <PokemonTypeChip pokemonType={pokemonType.pokemon_v2_type?.name} />
          ))}
        </Row>

        {mode === "myPokemons" && (
          <Text
            className={styles.releaseButton}
            onClick={() => {
              onReleasePokemon && onReleasePokemon(pokemon.name);
            }}
          >
            Release
          </Text>
        )}
      </div>
    </Fade>
  );
}

const styles = {
  container: css({
    width: "100%",
    borderRadius: 8,
    cursor: "pointer",
    marginLeft: 8,
    marginRight: 8,
    padding: 12,
  }),
  pokemonNumber: css({
    fontWeight: "bold",
    fontSize: FONT_SIZE.large,
    color: "rgba(255,255,255,0.75)",
  }),
  pokemonName: css({
    fontWeight: "bold",
    fontSize: FONT_SIZE.large,
    color: colors.white,
    marginBottom: 8,
  }),
  contentContainer: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }),
  contentContainerCenter: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  }),
  releaseButton: css({
    fontWeight: "bold",
    color: colors.white,
    fontSize: FONT_SIZE.medium,
    marginTop: 12,
    cursor: "pointer",
    backgroundColor: colors.pastelRed,
    borderRadius: 18,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    textAlign: "center",
  }),
};
