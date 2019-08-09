import React from "react";
import ReactCalendar from "react-calendar";
import "./Calendar.css";
import { updateDate } from "../../BusinessLogic/functions";
import { UI } from "../../BusinessLogic/calendarUI";

export const Calendar = ({
  selectedDate,
  yearNumber,
  monthNumber,
  currentMonth,
  currentPattern,
  updateAppState,
}) => {
  const onChange = changedDate =>
    updateAppState(state => updateDate(state)(changedDate));

  const selectFirstDayOfMonth = ({ activeStartDate }) =>
    updateAppState(state => updateDate(state)(activeStartDate));

  const addCalenderElements = ({ date, view }) => {
    if (view === "month") {
      return [
        UI.renderHolidays(date, yearNumber),
        UI.renderMasterCutoff(date, monthNumber, currentMonth, yearNumber),
        UI.renderNoCycles(date, monthNumber, yearNumber),
        UI.renderGreenCycles(date, monthNumber, yearNumber),
        UI.renderBeginEndDates(date, currentPattern, currentMonth, yearNumber),
        UI.renderPayday(date, currentMonth, yearNumber),
        UI.renderDirectDeposit(date, currentMonth, yearNumber),
      ].filter(itemToRender => itemToRender !== null);
    } else {
      return null;
    }
  };

  return (
    <section className="container">
      <ReactCalendar
        value={selectedDate}
        className="calendar"
        onChange={onChange}
        tileContent={addCalenderElements}
        onActiveDateChange={selectFirstDayOfMonth}
        calendarType="US"
        showNeighboringMonth
        minDetail="month"
      />
    </section>
  );
};
