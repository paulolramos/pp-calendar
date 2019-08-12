import React from "react";
import styles from "./search.module.css";
import { updateDate } from "../../BusinessLogic/functions";

export const Search = ({ updateAppState }) => {
  const onSubmit = e => {
    e.preventDefault();
    const value = new Date(document.getElementById("search").value);
    const newDate = new Date(value.setDate(value.getDate() + 1));
    updateAppState(state => updateDate(state)(newDate));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <label htmlFor="date" className={styles.label}>
          Search by Date:
        </label>
        <input
          id="search"
          className={styles.input}
          type="date"
          autoComplete="off"
        />
        <button className={styles.button}>Go</button>
      </form>
    </div>
  );
};
