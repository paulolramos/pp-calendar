import React from "react";
import styles from "./dashboard.module.css";
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
  return (
    <section className={styles.container}>
      <div className={styles.col1}>
        <TodayDate selectedDate={selectedDate} />
        <Search updateAppState={updateAppState} />
        <ResetButton today={today} updateAppState={updateAppState} />
      </div>
      <div className={styles.col2}>
        <LabelField label="Begins" message={"Jul 31"} />
        <LabelField label="Ends" message={"Aug 29"} />
        <LabelField label="Work Days" message={"22"} />
        <LabelField label="Work Hours" message={"176"} />
      </div>
      <div className={styles.col3}>
        <LabelField
          label="Master Mail/Transfer"
          message={formatSidebarDate(
            getDateOfMasterTransfer(currentMonth, yearNumber)
          )}
        />
        <LabelField
          label="Master Payday"
          message={formatSidebarDate(
            getPriorWorkday(getDateOfMasterPayday(currentMonth, yearNumber))
          )}
        />
        <LabelField
          label="Release Master"
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
