import { css } from "@emotion/css";
import { colors } from "../constants/colors";
import { FONT_SIZE } from "../constants/style";

import { Text } from "../core-ui";
import { sanitizeName } from "../helpers/stringManipulation";

type Props = {
  pokemonType: string | undefined;
};

export default function PokemonTypeChip(props: Props) {
  const { pokemonType } = props;

  return (
    <div className={styles.pokemonTypeChip}>
      <Text className={styles.pokemonType}>
        {pokemonType ? sanitizeName(pokemonType) : ""}
      </Text>
    </div>
  );
}

const styles = {
  pokemonTypeChip: css({
    backgroundColor: "rgba(255,255,255,0.45)",
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
