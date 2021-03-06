import React from "react";
import styles from "./labelField.module.css";

export const LabelField = ({ label, message }) => {
  return (
    <div>
      <label className={styles.label} htmlFor="message">
        {label}
      </label>
      <span className={styles.message} name="message">
        {message}
      </span>
    </div>
  );
};
