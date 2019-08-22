import React from "react";
import styles from "./todayDate.module.css";

export const TodayDate = ({ selectedDate }) => {
  const dateFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div>
      <span className={styles.date}>
        {selectedDate.toLocaleDateString("en-us", dateFormatOptions)}
      </span>
    </div>
  );
};
