import React from "react";
import ReactCalendar from "react-calendar";
import { container } from "./calendar.module.css";

export const Calendar = () => {
  return (
    <section className={container}>
      <ReactCalendar />
    </section>
  );
};
