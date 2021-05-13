import { css } from "@emotion/css";
import { useHistory } from "react-router";
import { mewImage } from "../assets";
import { colors } from "../constants/colors";
import { SCENE_NAME } from "../constants/navigation";
import { FONT_SIZE } from "../constants/style";
import { Text } from "../core-ui";

export default function NoMatchScene() {
  const history = useHistory();

  const onClickTakeMeBack = () => {
    history.replace(SCENE_NAME.home);
  };

  return (
    <div className={styles.root}>
      <img
        alt=""
        src={mewImage}
        width={100}
        height={100}
        className={styles.mewImage}
      />
      <Text className={styles.oops}>Oops! :(</Text>
      <Text className={styles.caption}>It seems that you are lost.</Text>
      <Text className={styles.caption}>
        Don't worry, Mew will take you back to safety!
      </Text>

      <div className={styles.takeMeBack} onClick={onClickTakeMeBack}>
        <Text className={styles.takeMeBackText}>Take me back</Text>
      </div>
    </div>
  );
}

const styles = {
  root: css({
    marginTop: 56,
    marginLeft: 24,
    marginRight: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  }),
  mewImage: css({
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
  takeMeBack: css({
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: colors.lightPink,
    marginTop: 18,
    cursor: "pointer",
  }),
  takeMeBackText: css({
    fontWeight: "bold",
  }),
};
