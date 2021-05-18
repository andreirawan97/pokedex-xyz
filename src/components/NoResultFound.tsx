import { css } from "@emotion/css";
import { meowthImage } from "../assets";
import { colors } from "../constants/colors";
import { FONT_SIZE } from "../constants/style";
import { Text } from "../core-ui";
import { sanitizeName } from "../helpers/stringManipulation";

type Props = {
  searchTerm?: string;
  onClickBack?: () => void;
};

export default function NoResultFound(props: Props) {
  const { searchTerm, onClickBack } = props;

  return (
    <div className={styles.root}>
      <img
        alt=""
        src={meowthImage}
        width={100}
        height={100}
        className={styles.mewImage}
      />
      <Text className={styles.oops}>Oops! :(</Text>
      <Text className={styles.caption}>
        Meowth couldn't find
        <Text className={styles.blueText}>"{sanitizeName(searchTerm)}"</Text>.
      </Text>
      <Text className={styles.caption}>
        Make sure you type it correctly because it's sensitive (as sensitive as
        Latias).
      </Text>

      <div className={styles.takeMeBack} onClick={onClickBack}>
        <Text className={styles.takeMeBackText}>Okay</Text>
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
  blueText: css({
    color: colors.slateBlue,
    fontWeight: "bold",
    marginLeft: 4,
  }),
  takeMeBack: css({
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: colors.bisque,
    marginTop: 18,
    cursor: "pointer",
  }),
  takeMeBackText: css({
    fontWeight: "bold",
  }),
};
