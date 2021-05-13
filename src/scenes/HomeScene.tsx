import { css } from "@emotion/css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { mysticImage, valorImage, instinctImage } from "../assets";
import { ModuleSelection, SearchBar } from "../components";
import { SCENE_NAME } from "../constants/navigation";
import { STORAGE_KEYS } from "../constants/storageKey";
import { FONT_SIZE } from "../constants/style";
import { Row, Text } from "../core-ui";
import { getDataFromStorage, setDataToStorage } from "../helpers/storage";
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
      />

      {/* <Fade left cascade opposite duration={500}> */}
      <div>
        <ModuleSelection
          containerClassName={styles.moduleContainer}
          moduleType="pokedex"
          onClick={() => history.push(SCENE_NAME.pokedex)}
        />

        <ModuleSelection
          containerClassName={styles.moduleContainer}
          moduleType="myPokemon"
        />
      </div>
      {/* </Fade> */}
    </div>
  );
}

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    paddingTop: 56,
    marginLeft: 32,
    marginRight: 32,
  }),
  headerContainer: css({
    marginBottom: 18,
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
