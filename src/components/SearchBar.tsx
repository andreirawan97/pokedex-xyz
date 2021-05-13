import { css } from "@emotion/css";
import { SearchOutline as SearchOutlineIcon } from "react-ionicons";

import { colors } from "../constants/colors";
import { Row, TextField } from "../core-ui";

type Props = {
  value?: string;
  onChangeText?: (value: string) => void;
  containerClassName?: string;
};
export default function SearchBar(props: Props) {
  const { containerClassName, onChangeText, value } = props;

  return (
    <Row className={`${styles.container} ${containerClassName}`}>
      <SearchOutlineIcon
        cssClasses={styles.searchIcon}
        color={colors.grey}
        width="20px"
        height="20px"
      />

      <TextField
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter pokemon name"
      />
    </Row>
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
};
