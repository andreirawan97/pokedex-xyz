import { css } from "@emotion/css";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Row(props: Props) {
  const { className } = props;
  return <div className={`${styles.row} ${className}`}>{props.children}</div>;
}

const styles = {
  row: css({
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  }),
};
