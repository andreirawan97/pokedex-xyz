import { css } from "@emotion/css";
import { SyncLoader } from "react-spinners";

import { colors } from "../constants/colors";

type Props = {
  loading: boolean;
};
export default function Loading(props: Props) {
  const { loading } = props;

  return (
    <div className={styles.container}>
      <SyncLoader color={colors.slateBlue} loading={loading} size={15} />
    </div>
  );
}

const styles = {
  container: css({
    display: "flex",
    justifyContent: "center",
    marginTop: 36,
  }),
};
