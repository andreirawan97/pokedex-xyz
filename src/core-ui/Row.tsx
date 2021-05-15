import { css } from "@emotion/css";
import { HTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Row(props: Props) {
  const { className } = props;
  return (
    <div {...props} className={`${styles.row} ${className}`}>
      {props.children}
    </div>
  );
}

const styles = {
  row: css({
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  }),
};
