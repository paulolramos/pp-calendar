import React from "react";
import styles from "./dashboard.module.css";
import {
  formatToNumeric,
  getDateOfMasterPayroll,
  getDateOfMasterPayday,
  getPriorWorkday,
  getDateOfMasterTransfer,
  getDateOfDirectDeposit,
  formatToShortDate,
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
  const { begins, ends, workdays, workhours } = formatToShortDate(
    currentPattern,
    currentMonth,
    yearNumber
  );
  return (
    <section className={styles.container}>
      <div className={styles.col1}>
        <TodayDate selectedDate={selectedDate} />
        <Search updateAppState={updateAppState} />
        <ResetButton today={today} updateAppState={updateAppState} />
      </div>
      <div className={styles.col2}>
        <LabelField label="Begins" message={begins} />
        <LabelField label="Ends" message={ends} />
        <LabelField label="Work Days" message={workdays} />
        <LabelField label="Work Hours" message={workhours} />
      </div>
      <div className={styles.col3}>
        <LabelField
          label="Master Mail/Transfer"
          message={formatToNumeric(
            getDateOfMasterTransfer(currentMonth, yearNumber)
          )}
        />
        <LabelField
          label="Release Master"
          message={formatToNumeric(
            getPriorWorkday(getDateOfMasterPayday(currentMonth, yearNumber))
          )}
        />
        <LabelField
          label="Master Payday"
          message={formatToNumeric(
            getDateOfMasterPayday(currentMonth, yearNumber)
          )}
        />
        <LabelField
          label="Master Issue"
          message={formatToNumeric(
            getDateOfMasterPayroll(currentMonth, yearNumber)
          )}
        />
        <LabelField
          label="Direct Deposit"
          message={formatToNumeric(
            getDateOfDirectDeposit(currentMonth, yearNumber)
          )}
        />
      </div>
    </section>
  );
};
