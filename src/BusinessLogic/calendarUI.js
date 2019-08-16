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
    className="calendar-label holiday"
    key="holiday"
    title={`${name}: This is a standard CSU Holiday`}
  >
    Holiday*
  </div>
);
const MoveableHolidayMarkup = name => (
  <div
    className="calendar-label moveable-holiday"
    key="holiday"
    title={`${name}: This holiday may be moved.`}
  >
    Holiday*
  </div>
);
const masterCutoffMarkup = (
  <div className="calendar-label master-cutoff" key="master-cutoff">
    Payroll Cutoff
  </div>
);
const noCycleMarkup = (
  <div className="calendar-label no-cycle" key="no-cycle">
    No Cycle
  </div>
);
const greenCycleMarkup = (
  <div className="calendar-label green-cycle" key="green-cycle">
    Green Cycle
  </div>
);
const beginDateMarkup = (
  <div className="calendar-label begin-date" key="begin">
    PP Begins
  </div>
);
const endDateMarkup = (
  <div className="calendar-label end-date" key="end">
    PP Ends
  </div>
);
const paydayMarkup = (
  <div className="calendar-label payday" key="payday">
    Pay Day
  </div>
);
const directDepositMarkup = (
  <div className="calendar-label direct-deposit" key="direct-deposit">
    Direct Deposit
  </div>
);

export const UI = {
  renderHolidays: (date, year) => {
    switch (date.valueOf()) {
      case newYears(year).valueOf():
        return standardHolidayMarkup("New Year's Day");
      case martinLutherKing(year).valueOf():
        return standardHolidayMarkup("Martin Luther King, Jr. Day");
      case presidents(year).valueOf():
        return MoveableHolidayMarkup("President's Day");
      case cesarChavez(year).valueOf():
        return standardHolidayMarkup("Cesar Chavez Day");
      case memorial(year).valueOf():
        return MoveableHolidayMarkup("Memorial Day");
      case independence(year).valueOf():
        return standardHolidayMarkup("Independence Day");
      case labor(year).valueOf():
        return standardHolidayMarkup("Labor Day");
      case veterans(year).valueOf():
        return standardHolidayMarkup("Veteran's Day");
      case thanksgiving(year).valueOf():
        return standardHolidayMarkup("Thanksgiving Day");
      case admissions(year).valueOf():
        return MoveableHolidayMarkup("Admission's Day");
      case christmas(year).valueOf():
        return standardHolidayMarkup("Christmas");
      case indigenousPeoples(year).valueOf():
        return MoveableHolidayMarkup("Columbus Day");
      case lincoln(year).valueOf():
        return MoveableHolidayMarkup("Lincoln's Birthday");
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
    if (date.valueOf() === payday.valueOf()) return paydayMarkup;
    return null;
  },
  renderDirectDeposit: (date, month, year) => {
    const directDeposit = getDateOfDirectDeposit(month, year);
    if (date.valueOf() === directDeposit.valueOf()) return directDepositMarkup;
    return null;
  },
};
