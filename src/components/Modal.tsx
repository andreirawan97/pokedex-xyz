import React, { ReactNode } from "react";
import { css } from "@emotion/css";
import { Bounce } from "react-reveal";
import { colors } from "../constants/colors";

type Props = {
  isShown: boolean;
  content?: ReactNode;
  contentContainerClassName?: string;
  onDismiss?: () => void;
};

export default function Modal(props: Props) {
  const { isShown, contentContainerClassName, content, onDismiss } = props;

  return (
    <>
      {isShown ? (
        <div className={styles.container}>
          <div
            className={styles.backdrop}
            onClick={() => onDismiss && onDismiss()}
          />
          <Bounce>
            <div
              className={`${styles.modalContainer} ${contentContainerClassName}`}
            >
              {content}
            </div>
          </Bounce>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = {
  container: css({
    width: "100vw",
    height: "100vh",
    zIndex: 99,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  backdrop: css({
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 99,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  }),
  modalContainer: css({
    zIndex: 100,
    position: "absolute",
    width: 300,
    minHeight: 300,
    maxHeight: 450,
    backgroundColor: colors.white,
    borderRadius: 24,
    overflow: "scroll",
  }),
};
