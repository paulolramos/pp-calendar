import React from "react";
import styles from "./dashboard.module.css";
import { patterns } from "../../data";
import {
  formatSidebarDate,
  getDateOfMasterPayroll,
  getDateOfMasterPayday,
  getPriorWorkday,
  getDateOfMasterTransfer,
  getDateOfDirectDeposit,
} from "../../BusinessLogic/functions";

import { TodayDate } from "../todayDate/todayDate";
import { Search } from "../search/search";
import { ResetButton } from "../ResetButton/ResetButton";
import { LabelField } from "../labelField/labelField";

export const Dashboard = ({
  selectedDate,
  today,
  yearNumber,
  currentMonth,
  currentPattern,
  updateAppState,
}) => {
  const pattern = currentPattern - 1;
  const beginningMonth = new Date(
    yearNumber,
    patterns[pattern][currentMonth].beginningMonth - 1
  ).toLocaleDateString("en-us", { month: "short" });
  const { beginningDay } = patterns[pattern][currentMonth];
  const endMonth = new Date(
    yearNumber,
    patterns[pattern][currentMonth].endMonth - 1
  ).toLocaleDateString("en-us", { month: "short" });
  const { endDay } = patterns[pattern][currentMonth];
  const { workdays } = patterns[pattern][currentMonth];

  return (
    <section className={styles.container}>
      <div className={styles.col1}>
        <TodayDate selectedDate={selectedDate} />
        <Search updateAppState={updateAppState} />
        <ResetButton today={today} updateAppState={updateAppState} />
      </div>
      <div className={styles.col2}>
        <LabelField
          label="Begins"
          message={beginningMonth + " " + beginningDay}
        />
        <LabelField label="Ends" message={endMonth + " " + endDay} />
        <LabelField label="Work Days" message={workdays} />
        <LabelField label="Work Hours" message={workdays * 8} />
      </div>
      <div className={styles.col3}>
        <LabelField
          label="Master Mail/Transfer"
          message={formatSidebarDate(
            getDateOfMasterTransfer(currentMonth, yearNumber)
          )}
        />
        <LabelField
          label="Release Master"
          message={formatSidebarDate(
            getPriorWorkday(getDateOfMasterPayday(currentMonth, yearNumber))
          )}
        />
        <LabelField
          label="Master Payday"
          message={formatSidebarDate(
            getDateOfMasterPayday(currentMonth, yearNumber)
          )}
        />
        <LabelField
          label="Master Issue"
          message={formatSidebarDate(
            getDateOfMasterPayroll(currentMonth, yearNumber)
          )}
        />
        <LabelField
          label="Direct Deposit"
          message={formatSidebarDate(
            getDateOfDirectDeposit(currentMonth, yearNumber)
          )}
        />
      </div>
    </section>
  );
};
