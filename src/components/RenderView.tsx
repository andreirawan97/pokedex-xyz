import { css } from "@emotion/css";
import { ReactNode } from "react";

import { pokemonBackground } from "../assets";
import { colors } from "../constants/colors";
import { MEDIA_QUERY, RENDER_WIDTH } from "../constants/style";
import useWindowDimensions from "../helpers/useWindowDimensions";

type Props = {
  children: ReactNode;
};

export default function RenderView(props: Props) {
  const { width } = useWindowDimensions();
  console.log(width);

  return (
    <div className={styles.root}>
      {width >= RENDER_WIDTH && (
        <img
          alt=""
          src={pokemonBackground}
          className={styles.imageBackground}
        />
      )}

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
      backgroundColor: colors.darkSlateGray,
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
    width: RENDER_WIDTH,
    height: "100vh",
    overflow: "scroll",
    borderRadius: 8,
    [MEDIA_QUERY.maxWidth]: {
      width: "100%",
    },
  }),
};
