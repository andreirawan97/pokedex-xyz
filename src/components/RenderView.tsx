import { css } from "@emotion/css";
import { ReactNode } from "react";

import { pokemonBackground } from "../assets";
import { colors } from "../constants/colors";
import { MEDIA_QUERY, RENDER_CONTAINER_WIDTH } from "../constants/style";

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
    height: "100vh",
    maxHeight: 900,
    width: RENDER_CONTAINER_WIDTH,
    overflow: "scroll",
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: "0px 5px",
    borderColor: colors.crimson,
    [MEDIA_QUERY.maxWidth]: {
      width: "100vw",
      paddingLeft: 0,
      paddingRight: 0,
      border: "0px",
    },
  }),
};
