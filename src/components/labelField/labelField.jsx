import React from "react";
import styles from "./LabelField.module.css";

export const LabelField = ({ label, message }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="message">
        {label}
      </label>
      <span className={styles.message} name="message">
        {message}
      </span>
    </div>
  );
};
