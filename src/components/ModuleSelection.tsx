import { css } from "@emotion/css";

import { myPokemonImage, pokedexImage } from "../assets";
import { colors } from "../constants/colors";
import { FONT_SIZE, RENDER_CONTAINER_WIDTH } from "../constants/style";
import { Text } from "../core-ui";

import "./ModuleSelection.css";

type ModuleType = "pokedex" | "myPokemon";

type Props = {
  moduleType: ModuleType;
  containerClassName?: string;
  onClick?: () => void;
};

export default function ModuleSelection(props: Props) {
  const { moduleType, containerClassName, onClick } = props;

  const getModuleConfig = () => {
    switch (moduleType) {
      case "pokedex": {
        return {
          color: colors.green,
          text: "Pokédex",
          image: pokedexImage,
        };
      }
      case "myPokemon": {
        return {
          color: colors.indianRed,
          text: "My Pokemon",
          image: myPokemonImage,
        };
      }
      default: {
        return {
          color: colors.darkSlateBlue,
          text: "",
        };
      }
    }
  };

  return (
    <div
      className={`module-selection ${styles.container} ${css({
        backgroundColor: getModuleConfig().color,
      })} ${containerClassName}`}
      onClick={onClick}
      {...props}
    >
      <Text className={styles.moduleText}>{getModuleConfig().text}</Text>
      <img
        src={getModuleConfig().image}
        alt=""
        className={styles.moduleImage}
      />
    </div>
  );
}

const styles = {
  container: css({
    maxWidth: RENDER_CONTAINER_WIDTH - 108,
    display: "flex",
    borderRadius: 20,
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
