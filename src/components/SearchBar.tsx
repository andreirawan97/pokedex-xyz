import { css } from "@emotion/css";
import { useState } from "react";
import { SearchOutline as SearchOutlineIcon } from "react-ionicons";
import { Fade } from "react-reveal";

import { colors } from "../constants/colors";
import { FONT_SIZE } from "../constants/style";
import { Row, Text, TextField } from "../core-ui";

export type SearchTerm = "Pokemon" | "Move" | "Item";

type Props = {
  value?: string;
  onChangeText?: (value: string) => void;
  onClickSearchAnchor?: (searchTerm: SearchTerm) => void;
  containerClassName?: string;
};
export default function SearchBar(props: Props) {
  const SEARCH_TERMS: Array<SearchTerm> = ["Pokemon", "Move", "Item"];
  const { containerClassName, onChangeText, value, onClickSearchAnchor } =
    props;

  const [showSearchAnchor, setSearchAnchor] = useState(false);

  const onTextFieldFocus = () => {
    setSearchAnchor(true);
  };

  const onTextFieldBlur = () => {
    setSearchAnchor(false);
  };

  return (
    <div className={`${containerClassName}`}>
      <Row className={`${styles.container}`}>
        <SearchOutlineIcon
          cssClasses={styles.searchIcon}
          color={colors.grey}
          width="20px"
          height="20px"
        />

        <TextField
          value={value}
          onChangeText={onChangeText}
          placeholder="Search Pokemon, Move, Item, etc"
          onFocus={onTextFieldFocus}
          onBlur={onTextFieldBlur}
        />
      </Row>

      <Fade collapse when={showSearchAnchor}>
        <div className={styles.searchAnchorContainer}>
          {SEARCH_TERMS.map((searchTerm) => (
            <div
              className={styles.searchAnchor}
              onClick={() => {
                showSearchAnchor &&
                  onClickSearchAnchor &&
                  onClickSearchAnchor(searchTerm);
              }}
            >
              <div className={styles.leftView} />
              <Text className={styles.searchAnchorText}>
                Find "{value}" in{" "}
                <Text className={styles.searchTerm}>{searchTerm}</Text>
              </Text>
            </div>
          ))}
        </div>
      </Fade>
    </div>
  );
}

const styles = {
  container: css({
    backgroundColor: colors.lightGrey,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 8,
    borderRadius: 24,
  }),
  searchIcon: css({
    marginRight: 4,
  }),
  searchAnchorContainer: css({
    display: "flex",
    flexDirection: "column",
    marginLeft: 42,
    marginTop: 8,
    cursor: "pointer",
  }),
  leftView: css({
    width: 4,
    height: "auto",
    backgroundColor: colors.slateBlue,
    marginRight: 6,
  }),
  searchAnchor: css({
    display: "flex",
    marginBottom: 8,
  }),
  searchAnchorText: css({
    fontSize: FONT_SIZE.default,
  }),
  searchTerm: css({
    fontSize: FONT_SIZE.default,
    color: colors.slateBlue,
    fontWeight: "bold",
    marginLeft: 4,
  }),
};
