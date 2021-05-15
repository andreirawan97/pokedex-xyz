import { css } from "@emotion/css";
import { colors } from "../constants/colors";
import { Row, Text } from "../core-ui";

import "./PokemonWeightHeight.css";

type Props = {
  weight: number | null;
  height: number | null;
};

export default function PokemonWeightHeight(props: Props) {
  const { weight, height } = props;

  return (
    <Row className={`pokemonwh-container ${styles.container}`}>
      <div className={styles.heightContainer}>
        <Text className={styles.title}>Height</Text>
        <Text>{height ? height / 100 : 0} m</Text>
      </div>
      <div className={styles.weightContainer}>
        <Text className={styles.title}>Weight</Text>
        <Text>{weight ? weight / 10 : 0} kg</Text>
      </div>
    </Row>
  );
}

const styles = {
  container: css({
    borderRadius: 21,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    display: "flex",
    flexDirection: "row",
    width: "65%",
    alignSelf: "center",
  }),
  weightContainer: css({
    width: "50%",
  }),
  heightContainer: css({
    width: "50%",
  }),
  title: css({
    color: colors.grey,
    marginBottom: 8,
  }),
};
