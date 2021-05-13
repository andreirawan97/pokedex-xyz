import { css } from "@emotion/css";
import { useHistory } from "react-router-dom";
import { ArrowBack as ArrowBackIcon } from "react-ionicons";
import { colors } from "../constants/colors";
import { Text } from "../core-ui";
import { FONT_SIZE } from "../constants/style";

export default function PokedexScene() {
  const history = useHistory();

  return (
    <div className={styles.root}>
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
    </div>
  );
}

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    paddingTop: 56,
    width: "100vw",
    marginLeft: 32,
    marginRight: 32,
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
};
