import { css } from "@emotion/css";
import { ReactNode, HTMLAttributes } from "react";

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function Text(props: Props) {
  const { className } = props;
  return (
    <div className={`${styles.defaultText} ${className}`} {...props}>
      {props.children}
    </div>
  );
}

const styles = {
  defaultText: css({
    fontFamily: "Roboto",
    display: "flex",
    flexDirection: "row",
  }),
};
