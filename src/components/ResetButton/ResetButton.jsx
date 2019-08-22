import React from "react";
import styles from "./ResetButton.module.css";
import { updateDate } from "../../BusinessLogic/functions";

export const ResetButton = ({ today, updateAppState }) => {
  return (
    <button
      className={styles.button}
      onClick={() => updateAppState(state => updateDate(state)(today))}
    >
      RESET
    </button>
  );
};
