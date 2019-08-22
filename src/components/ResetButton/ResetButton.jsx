import React from "react";
import styles from "./ResetButton.module.css";
import { updateDate } from "../../BusinessLogic/functions";

export const ResetButton = ({ today, updateAppState }) => {
  const handleClick = e => {
    e.preventDefault();
    updateAppState(state => updateDate(state)(today));
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      RESET
    </button>
  );
};
