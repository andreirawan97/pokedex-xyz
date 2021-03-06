import { css } from "@emotion/css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { mysticImage, valorImage, instinctImage } from "../assets";
import { ModuleSelection, SearchBar } from "../components";
import { SearchTerm } from "../components/SearchBar";
import { SCENE_NAME } from "../constants/navigation";
import { STORAGE_KEYS } from "../constants/storageKey";
import { FONT_SIZE } from "../constants/style";
import { Row, Text } from "../core-ui";
import { getDataFromStorage, setDataToStorage } from "../helpers/storage";
import { desanitizeName } from "../helpers/stringManipulation";
import { TeamPreference } from "../types/globalTypes";

export default function HomeScene() {
  const [teamPreference, setTeamPreference] = useState(
    getDataFromStorage(STORAGE_KEYS.teamPreference)
  );
  const [searchQuery, setSearchQuery] = useState("");

  const history = useHistory();

  const getTeamImage = () => {
    switch (teamPreference) {
      case "instinct": {
        return instinctImage;
      }
      case "mystic": {
        return mysticImage;
      }
      case "valor": {
        return valorImage;
      }
      default: {
        return valorImage;
      }
    }
  };

  const switchTeam = () => {
    let tmpTeamPreference = teamPreference as TeamPreference;

    // Valor -> Mystic -> Instinct
    if (tmpTeamPreference === "valor") {
      tmpTeamPreference = "mystic";
    } else if (tmpTeamPreference === "mystic") {
      tmpTeamPreference = "instinct";
    } else {
      tmpTeamPreference = "valor";
    }

    setTeamPreference(tmpTeamPreference);
    setDataToStorage(STORAGE_KEYS.teamPreference, tmpTeamPreference);
  };

  const onClickSearchAnchor = (searchTerm: SearchTerm) => {
    console.log(searchTerm);
    if (searchTerm === "Pokemon") {
      history.replace(
        `${SCENE_NAME.pokemonDetail}${desanitizeName(searchQuery)}`
      );
    }
  };

  return (
    <div className={styles.root}>
      <Row className={styles.headerContainer}>
        <div className={styles.headerTextContainer}>
          <Text className={styles.headerTextWithMarginBottom}>
            What Pokemon
          </Text>
          <Text className={styles.headerText}>are you looking for ?</Text>
        </div>

        <img
          src={getTeamImage()}
          alt=""
          className={styles.mysticImage}
          onClick={switchTeam}
        />
      </Row>

      <SearchBar
        containerClassName={styles.searchBar}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClickSearchAnchor={onClickSearchAnchor}
      />

      {/* <Fade left cascade opposite duration={500}> */}
      <div>
        <ModuleSelection
          containerClassName={styles.moduleContainer}
          moduleType="pokedex"
          onClick={() => history.replace(SCENE_NAME.pokedex)}
        />

        <ModuleSelection
          containerClassName={styles.moduleContainer}
          moduleType="myPokemon"
          onClick={() => history.replace(SCENE_NAME.myPokemons)}
        />
      </div>
      {/* </Fade> */}
    </div>
  );
}

const styles = {
  root: css({
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    paddingTop: 56,
    marginLeft: 21,
    marginRight: 21,
  }),
  headerContainer: css({
    marginBottom: 18,
    display: "flex",
    justifyContent: "space-between",
  }),
  headerTextContainer: css({
    display: "flex",
    flexDirection: "column",
    marginRight: 36,
  }),
  headerText: css({
    fontSize: FONT_SIZE.extraLarge,
    fontWeight: "bold",
  }),
  headerTextWithMarginBottom: css({
    fontSize: FONT_SIZE.extraLarge,
    fontWeight: "bold",
    marginBottom: 6,
  }),
  mysticImage: css({
    width: 50,
    height: 50,
    cursor: "pointer",
  }),
  searchBar: css({
    marginBottom: 24,
  }),
  moduleContainer: css({
    marginBottom: 16,
  }),
};
