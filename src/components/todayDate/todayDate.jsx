import React from "react";
import styles from "./TodayDate.module.css";

export const TodayDate = ({ selectedDate }) => {
  const dateFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className={styles.container}>
      <span className={styles.date}>
        {selectedDate.toLocaleDateString("en-us", dateFormatOptions)}
      </span>
    </div>
  );
};
