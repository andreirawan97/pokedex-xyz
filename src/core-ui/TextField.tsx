import { css } from "@emotion/css";
import { ChangeEvent, HTMLAttributes } from "react";

import "./TextField.css";

type Props = {
  value?: string;
  onChangeText?: (value: string) => void;
} & HTMLAttributes<HTMLInputElement>;

export default function TextField(props: Props) {
  const { onChangeText, value } = props;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText && onChangeText(e.target.value);
  };

  return (
    <input
      value={value}
      onChange={onChange}
      className={`text-field ${styles.container}`}
      {...props}
    />
  );
}

const styles = {
  container: css({
    display: "flex",
    flexGrow: 1,
  }),
};
