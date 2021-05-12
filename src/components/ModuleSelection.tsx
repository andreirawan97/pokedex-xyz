import { css } from "@emotion/css";
import { pokedexImage } from "../assets";

import { colors } from "../constants/colors";
import { FONT_SIZE } from "../constants/style";
import { Text } from "../core-ui";

import "./ModuleSelection.css";

type ModuleType = "pokedex";

type Props = {
  moduleType: ModuleType;
  containerClassName?: string;
};

export default function ModuleSelection(props: Props) {
  const { moduleType, containerClassName } = props;

  const backgroundClass = css({
    backgroundColor:
      moduleType === "pokedex" ? colors.green : colors.darkSlateBlue,
  });

  const getModuleImage = () => {
    switch (moduleType) {
      case "pokedex": {
        return pokedexImage;
      }
      default: {
        return pokedexImage;
      }
    }
  };

  return (
    <div
      className={`module-selection ${styles.container} ${backgroundClass} ${containerClassName}`}
    >
      <Text className={styles.moduleText}>Pokédex</Text>
      <img src={getModuleImage()} alt="" className={styles.moduleImage} />
    </div>
  );
}

const styles = {
  container: css({
    display: "flex",
    borderRadius: 8,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 14,
    paddingBottom: 14,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
  }),
  moduleText: css({
    fontWeight: "bold",
    color: colors.white,
    fontSize: FONT_SIZE.extraLarge,
    marginTop: 38,
  }),
  moduleImage: css({
    width: 60,
    height: 60,
  }),
};
