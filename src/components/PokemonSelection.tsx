import { css } from "@emotion/css";

import { colors } from "../constants/colors";
import { FONT_SIZE } from "../constants/style";
import { Row, Text } from "../core-ui";
import { GetPokemons_pokemon_v2_pokemon } from "../generated/server/GetPokemons";
import { sanitizeName } from "../helpers/stringManipulation";

import "./PokemonSelection.css";

type Props = {
  pokemon: GetPokemons_pokemon_v2_pokemon;
  onClick?: (pokemonName: string) => void;
};

export default function PokemonSelection(props: Props) {
  const { onClick, pokemon } = props;

  const firstPokemonType =
    pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type?.name;

  const pokemonImageURI = `https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`;
  const backgroundColor =
    // @ts-ignore
    colors.pokemonTypes[firstPokemonType ? firstPokemonType : "default"];

  const PokemonTypeChip = ({
    pokemonType,
  }: {
    pokemonType: string | undefined;
  }) => (
    <div className={styles.pokemonTypeChip} onClick={() => onClick && onClick}>
      <Text className={styles.pokemonType}>
        {pokemonType ? sanitizeName(pokemonType) : ""}
      </Text>
    </div>
  );

  return (
    <div
      className={`pokemon-selection ${styles.container} ${css({
        backgroundColor,
      })}`}
      onClick={() => onClick && onClick(pokemon.name)}
    >
      <div className={styles.contentContainer}>
        <Text className={styles.pokemonNumber}>#{pokemon.id}</Text>

        <img alt="" src={pokemonImageURI} className={styles.pokemonImage} />
      </div>

      <Text className={styles.pokemonName}>{sanitizeName(pokemon.name)}</Text>

      <Row>
        {pokemon.pokemon_v2_pokemontypes.map((pokemonType) => (
          <PokemonTypeChip pokemonType={pokemonType.pokemon_v2_type?.name} />
        ))}
      </Row>
    </div>
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
  pokemonImage: css({
    width: 65,
    height: 65,
  }),
  pokemonTypeChip: css({
    backgroundColor: "rgba(255,255,255,0.4)",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 12,
    marginRight: 4,
  }),
  pokemonType: css({
    fontWeight: "bold",
    fontSize: FONT_SIZE.small,
    color: colors.white,
  }),
};
