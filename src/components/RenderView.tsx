import { css } from "@emotion/css";
import { ReactNode } from "react";

import { pokemonBackground } from "../assets";
import { colors } from "../constants/colors";
import { MEDIA_QUERY } from "../constants/style";

type Props = {
  children: ReactNode;
};

export default function RenderView(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.renderContainer}>{props.children}</div>
    </div>
  );
}

const styles = {
  root: css({
    [MEDIA_QUERY.minWidth]: {
      display: "flex",
      width: "100vw",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.darkSlateGray,
      backgroundImage: `url(${pokemonBackground})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
  }),
  imageBackground: css({
    position: "absolute",
    zIndex: 0,
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }),
  renderContainer: css({
    zIndex: 1,
    display: "flex",
    backgroundColor: "white",
    justifyContent: "center",
    width: 420,
    height: "100vh",
    maxHeight: 900,
    overflow: "scroll",
    borderRadius: 8,
    [MEDIA_QUERY.maxWidth]: {
      width: "100%",
    },
  }),
};
