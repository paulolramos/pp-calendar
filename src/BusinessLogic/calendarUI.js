import React from "react";
import { patterns } from "../data";

import {
  newYears,
  martinLutherKing,
  presidents,
  cesarChavez,
  memorial,
  independence,
  labor,
  veterans,
  thanksgiving,
  admissions,
  christmas,
  indigenousPeoples,
  lincoln,
} from "./holidays";

import {
  isMasterCutoff,
  masterCutoffDate,
  getAllNoCycles,
  isNoCycle,
  getMidMonthGreenCycles,
  getMasterGreenCycles,
  isGreenCycle,
  getDateOfMasterPayday,
  getDateOfDirectDeposit,
} from "./functions";

const standardHolidayMarkup = name => (
  <div
    className="holiday"
    key="h"
    title={`${name}: This is a standard CSU Holiday`}
  >
    Holiday*
  </div>
);
const MoveableHolidayMarkup = name => (
  <div
    className="moveable-holiday"
    key="h"
    title={`${name}: This holiday may be moved.`}
  >
    Holiday*
  </div>
);
const masterCutoffMarkup = (
  <div className="master-cutoff" key="m">
    Payroll Cutoff
  </div>
);
const noCycleMarkup = (
  <div className="no-cycle" key="n">
    No Cycle
  </div>
);
const greenCycleMarkup = (
  <div className="green-cycle" key="g">
    Green Cycle
  </div>
);
const beginDateMarkup = (
  <div className="begin-date" key="b">
    PP Begins
  </div>
);
const endDateMarkup = (
  <div className="end-date" key="e">
    PP Ends
  </div>
);
const paydayMarkdown = (
  <div className="payday" key="p">
    Pay Day
  </div>
);
const directDepositMarkdown = (
  <div className="direct-deposit" key="dd">
    Direct Deposit
  </div>
);

export const UI = {
  renderHolidays: (date, year) => {
    const holidayNames = [
      "New Year's Day",
      "Martin Luther King, Jr. Day",
      "President's Day",
      "Cesar Chavez Day",
      "Memorial Day",
      "Independence Day",
      "Labor Day",
      "Veteran's Day",
      "Thanksgiving Day",
      "Admission's Day",
      "Christmas",
      "Columbus Day",
      "Lincoln's Birthday",
    ];
    switch (date.valueOf()) {
      case newYears(year).valueOf():
        return standardHolidayMarkup(holidayNames[0]);
      case martinLutherKing(year).valueOf():
        return standardHolidayMarkup(holidayNames[1]);
      case presidents(year).valueOf():
        return MoveableHolidayMarkup(holidayNames[2]);
      case cesarChavez(year).valueOf():
        return standardHolidayMarkup(holidayNames[3]);
      case memorial(year).valueOf():
        return MoveableHolidayMarkup(holidayNames[4]);
      case independence(year).valueOf():
        return standardHolidayMarkup(holidayNames[5]);
      case labor(year).valueOf():
        return standardHolidayMarkup(holidayNames[6]);
      case veterans(year).valueOf():
        return standardHolidayMarkup(holidayNames[7]);
      case thanksgiving(year).valueOf():
        return standardHolidayMarkup(holidayNames[8]);
      case admissions(year).valueOf():
        return MoveableHolidayMarkup(holidayNames[9]);
      case christmas(year).valueOf():
        return standardHolidayMarkup(holidayNames[10]);
      case indigenousPeoples(year).valueOf():
        return MoveableHolidayMarkup(holidayNames[11]);
      case lincoln(year).valueOf():
        return MoveableHolidayMarkup(holidayNames[12]);
      default:
        return null;
    }
  },
  renderMasterCutoff: (date, payperiod, month, year) => {
    const masterCutoff = masterCutoffDate(payperiod, month, year);
    if (isMasterCutoff(date, masterCutoff)) return masterCutoffMarkup;
    return null;
  },
  renderNoCycles: (date, payperiod, year) => {
    const allNoCycles = getAllNoCycles(payperiod, year);
    if (isNoCycle(date, allNoCycles)) return noCycleMarkup;
    return null;
  },
  renderGreenCycles: (date, payperiod, year) => {
    const midMonthGreenCycles = getMidMonthGreenCycles(payperiod, year);
    const masterGreenCycles = getMasterGreenCycles(payperiod, year);
    if (isGreenCycle(date, midMonthGreenCycles, masterGreenCycles))
      return greenCycleMarkup;
    return null;
  },
  renderBeginEndDates: (date, pattern, month, year) => {
    const currentYear = year;
    const currentPattern = pattern - 1;
    // construct dates from patterns
    const beginningMonth = patterns[currentPattern][month].beginningMonth - 1;
    const beginningDay = patterns[currentPattern][month].beginningDay;
    const beginDate = new Date(currentYear, beginningMonth, beginningDay);

    const endMonth = patterns[currentPattern][month].endMonth - 1;
    const endDay = patterns[currentPattern][month].endDay;
    const endDate = new Date(currentYear, endMonth, endDay);

    // check the value of constructed dates with all calendar dates, if match return respective markup
    if (date.valueOf() === beginDate.valueOf()) return beginDateMarkup;
    if (date.valueOf() === endDate.valueOf()) return endDateMarkup;
    return null;
  },
  renderPayday: (date, month, year) => {
    const payday = getDateOfMasterPayday(month, year);
    if (date.valueOf() === payday.valueOf()) return paydayMarkdown;
    return null;
  },
  renderDirectDeposit: (date, month, year) => {
    const directDeposit = getDateOfDirectDeposit(month, year);
    if (date.valueOf() === directDeposit.valueOf())
      return directDepositMarkdown;
    return null;
  },
};
