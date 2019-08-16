import { checkIfHoliday, getHolidaysForMonth } from "./holidays";
import { patterns, patternCycles } from "../data";

const updateDate = state => date => ({
  ...state,
  currentPattern: getPattern(date.getFullYear()),
  selectedDate: date,
  currentMonth: date.toLocaleDateString("en-us", {
    month: "short",
  }),
  monthNumber: date.getMonth() + 1,
  yearNumber: date.getFullYear(),
});

const increment = date => new Date(date.setDate(date.getDate() + 1));
const decrement = date => new Date(date.setDate(date.getDate() - 1));

const formatToNumeric = date =>
  date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

const formatToShortDate = (currentPattern, currentMonth, yearNumber) => {
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

  return {
    begins: beginningMonth + " " + beginningDay,
    ends: endMonth + " " + endDay,
    workdays: String(workdays),
    workhours: (workdays * 8).toString(),
  };
};

const isWeekend = date => {
  let weekend;
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 6 || dayOfWeek === 0) {
    weekend = true;
  } else {
    weekend = false;
  }
  return weekend;
};

function getPriorWorkday(date) {
  let newDate = decrement(new Date(date));
  while (isWeekend(newDate) || checkIfHoliday(newDate)) {
    newDate = decrement(newDate);
  }
  return newDate;
}

function getWorkdayAfter(date) {
  let newDate = increment(new Date(date));
  while (isWeekend(newDate) || checkIfHoliday(newDate)) {
    newDate = increment(newDate);
  }
  return newDate;
}

const getPattern = year => {
  const patternIndex = (Number(year) + 22) % 28;
  return patternCycles[patternIndex];
};

const getLastDateOfPayPeriod = (payperiod, year) => {
  let month;
  const patternIndex = getPattern(year) - 1;

  if (typeof payperiod === "number") {
    month = new Date(0, payperiod - 1, 1).toLocaleDateString("en-us", {
      month: "short",
    });
  } else {
    month = payperiod;
  }

  const monthNumber = patterns[patternIndex][month].endMonth - 1;
  const dayNumber = patterns[patternIndex][month].endDay;
  return new Date(year, monthNumber, dayNumber);
};

const getPayPeriodOfDate = date => {
  let payperiod;
  const year = date.getFullYear();
  for (let i = 1; i <= 12; i++) {
    payperiod = i;
    if (date <= getLastDateOfPayPeriod(i, year)) {
      break;
    }
  }
  return payperiod;
};

const businessMonthEndDates = (payperiod, year) => {
  const firstDayOfNextMonth = new Date(year, payperiod, 1);
  const businessMonthEndArray = [];
  let numberOfNoCycles;

  switch (payperiod) {
    case 6:
      numberOfNoCycles = 3;
      break;
    default:
      numberOfNoCycles = 2;
      break;
  }

  let nextNoCycle = getPriorWorkday(firstDayOfNextMonth);
  for (let i = 0; i < numberOfNoCycles; i++) {
    businessMonthEndArray.push(new Date(nextNoCycle));
    nextNoCycle = getPriorWorkday(nextNoCycle);
  }
  return businessMonthEndArray;
};

const minimumNumberOfMasterGreenCycles = (payperiod, year) => {
  let minimumCycles;
  switch (payperiod) {
    case 2: //  'Feb
      minimumCycles = 3;
      break;
    case 6: //  'Jun
      if (year >= 2016) {
        minimumCycles = 3;
      } else {
        minimumCycles = 2;
      }
      break;
    case 11: // 'Nov
      minimumCycles = 3;
      break;
    case 12: // 'Dec
      minimumCycles = 4;
      break;
    default:
      minimumCycles = 3;
      break;
  }
  return minimumCycles;
};

// MID-MONTH CALCULATIONS //
// 1 workday before the 16th of a given month
const getMidmonthPayday = (payperiod, year) => {
  const midmonthPayday = new Date(year, payperiod - 1, 16);
  return getPriorWorkday(midmonthPayday);
};

// 3 workdays before Midmonth payday
const getMidmonthTransfer = (payperiod, year) => {
  const midmonthPayday = getMidmonthPayday(payperiod, year);
  let midmonthTransfer = getPriorWorkday(midmonthPayday);
  midmonthTransfer = getPriorWorkday(midmonthTransfer);
  return getPriorWorkday(midmonthTransfer);
};

// 1 workday before midmonth transfer
const getMidmonthCutoff = (payperiod, year) => {
  const midmonthTransfer = getMidmonthTransfer(payperiod, year);
  return getPriorWorkday(midmonthTransfer);
};

const getBusinessMidMonth = (payperiod, year) => {
  let businessMidMonth = new Date(year, payperiod - 1, 16);
  businessMidMonth = getPriorWorkday(businessMidMonth);
  return businessMidMonth;
};

// MASTER PAYROLL CALCULATIONS

const getDateOfMasterPayroll = (month, year) => {
  let masterPayroll = getLastDateOfPayPeriod(month, year);
  if (masterPayroll.getDate() !== 1) {
    masterPayroll = increment(masterPayroll);
  }
  return masterPayroll;
};

const getDateOfMasterPayday = (month, year) => {
  let masterPayday;
  let endofPayPeriod = getLastDateOfPayPeriod(month, year);
  endofPayPeriod = increment(endofPayPeriod);
  const lastWorkdayInPayPeriod = getPriorWorkday(endofPayPeriod);
  const masterPayroll = getDateOfMasterPayroll(month, year);

  if (masterPayroll.valueOf() === lastWorkdayInPayPeriod.valueOf()) {
    masterPayday = masterPayroll;
  } else {
    masterPayday = getPriorWorkday(masterPayroll);
  }
  return masterPayday;
};

const getDateOfMasterTransfer = (month, year) => {
  const masterPayday = getDateOfMasterPayday(month, year);
  let masterTransfer = getPriorWorkday(masterPayday);
  masterTransfer = getPriorWorkday(masterTransfer);
  return masterTransfer;
};

const getDateOfDirectDeposit = (month, year) => {
  const endofPayPeriod = getLastDateOfPayPeriod(month, year);
  const directDeposit = getWorkdayAfter(endofPayPeriod);
  return directDeposit;
};

const masterCutoffDate = (payperiod, month, year) => {
  const masterTransfer = getDateOfMasterTransfer(month, year);

  let fourDaysPriorToTransfer = getPriorWorkday(masterTransfer);
  for (let i = 2; i <= 4; i++) {
    fourDaysPriorToTransfer = getPriorWorkday(fourDaysPriorToTransfer);
  }

  let masterCutoff = fourDaysPriorToTransfer;
  let masterCutoffNoCycle = getWorkdayAfter(masterCutoff);

  const businessNoCycles = businessMonthEndDates(payperiod, year);
  let firstBusinessNoCycle = businessNoCycles[0];
  // is this loop necessary?
  for (let i = 1; i < businessNoCycles.length; i++) {
    if (businessNoCycles[i] < firstBusinessNoCycle) {
      firstBusinessNoCycle = businessNoCycles[i];
    }
  }

  let possibleGreenCycle = getPriorWorkday(firstBusinessNoCycle);
  for (let i = 1; i <= minimumNumberOfMasterGreenCycles(payperiod, year); i++) {
    if (possibleGreenCycle <= masterCutoffNoCycle) {
      masterCutoff = getPriorWorkday(masterCutoff);
      masterCutoffNoCycle = getWorkdayAfter(masterCutoff);
    }
    possibleGreenCycle = getPriorWorkday(possibleGreenCycle);
  }
  return masterCutoff;
};

const getMasterNoCycle = (payperiod, year) => {
  const month = new Date(0, payperiod - 1, 1).toLocaleDateString("en-us", {
    month: "short",
  });
  const masterCutoff = masterCutoffDate(payperiod, month, year);
  const masterNoCycle = getWorkdayAfter(masterCutoff);
  return masterNoCycle;
};

// CALENDAR UI

const isMasterCutoff = (date, masterCutoff) => {
  if (date.valueOf() === masterCutoff.valueOf()) return true;
  return false;
};

const getAllNoCycles = (payperiod, year) => {
  const allNoCycles = [];
  let previousBusinessMonthEnd = [];
  const monthHolidays = getHolidaysForMonth(payperiod, year);
  const thisBusinessMonthEnd = businessMonthEndDates(payperiod, year);

  if (payperiod === 1) {
    previousBusinessMonthEnd = businessMonthEndDates(12, year - 1);
  } else {
    previousBusinessMonthEnd = businessMonthEndDates(payperiod - 1, year);
  }

  monthHolidays.forEach(holiday => {
    if (isWeekend(holiday) === false) allNoCycles.push(new Date(holiday));
  });

  thisBusinessMonthEnd.forEach(date => {
    if (getPayPeriodOfDate(date) === payperiod)
      allNoCycles.push(new Date(date));
  });

  previousBusinessMonthEnd.forEach(date => {
    if (getPayPeriodOfDate(date) === payperiod)
      allNoCycles.push(new Date(date));
  });

  const businessMidMonth = getBusinessMidMonth(payperiod, year);
  allNoCycles.push(new Date(businessMidMonth));
  const masterNoCycle = getMasterNoCycle(payperiod, year);
  allNoCycles.push(new Date(masterNoCycle));
  allNoCycles.sort((a, b) => a.valueOf() - b.valueOf());
  return allNoCycles;
};

const isNoCycle = (checkDate, allNoCycles) => {
  for (let i = 0; i < allNoCycles.length; i++) {
    if (checkDate.valueOf() === allNoCycles[i].valueOf()) {
      return true;
    }
  }
  return false;
};

// Green Cycles
const isGreenCycle = (date, midMonthGreenCycles, masterGreenCycles) => {
  for (let i = 0; i < midMonthGreenCycles.length; i++) {
    if (date.valueOf() === midMonthGreenCycles[i].valueOf()) {
      return true;
    }
  }
  for (let y = 0; y < masterGreenCycles.length; y++) {
    if (date.valueOf() === masterGreenCycles[y].valueOf()) {
      return true;
    }
  }
  return false;
};

const getMidMonthGreenCycles = (payperiod, year) => {
  const greenCycles = [];
  const midMonthCutoff = getMidmonthCutoff(payperiod, year);
  const businessMidMonth = getBusinessMidMonth(payperiod, year);
  let nextGreenCycle = getWorkdayAfter(midMonthCutoff);

  while (nextGreenCycle < businessMidMonth) {
    greenCycles.push(new Date(nextGreenCycle));
    nextGreenCycle = getWorkdayAfter(nextGreenCycle);
  }
  return greenCycles;
};

const getMasterGreenCycles = (payperiod, year) => {
  const greenCycles = [];
  const businessNoCycles = businessMonthEndDates(payperiod, year);
  let firstBusinessNoCycle = businessNoCycles[0];
  for (let i = 1; i < businessNoCycles.length; i++) {
    if (businessNoCycles[i] < firstBusinessNoCycle) {
      firstBusinessNoCycle = businessNoCycles[i];
    }
  }

  const masterNoCycle = getMasterNoCycle(payperiod, year);
  let nextGreenCycle = getWorkdayAfter(masterNoCycle);
  while (nextGreenCycle < firstBusinessNoCycle) {
    greenCycles.push(new Date(nextGreenCycle));
    nextGreenCycle = getWorkdayAfter(nextGreenCycle);
  }
  return greenCycles;
};

// Keyboard functions
const keyboardNavigation = e => {
  const prevMonth = document.querySelector(
    ".react-calendar__navigation__prev-button"
  );
  const prevYear = document.querySelector(
    ".react-calendar__navigation__prev2-button"
  );
  const nextMonth = document.querySelector(
    ".react-calendar__navigation__next-button"
  );
  const nextYear = document.querySelector(
    ".react-calendar__navigation__next2-button"
  );
  const todayButton = document.querySelector(".today-button");

  if (e.keyCode === 38) {
    // up arrow key
    nextYear.click();
  } else if (e.keyCode === 40) {
    // down arrow key
    prevYear.click();
  } else if (e.keyCode === 37) {
    // left arrow key
    prevMonth.click();
  } else if (e.keyCode === 39) {
    // right arrow key
    nextMonth.click();
  } else if (e.keyCode === 32) {
    // right arrow key
    todayButton.click();
  }
};

export {
  updateDate,
  formatToNumeric,
  formatToShortDate,
  getPattern,
  getPriorWorkday,
  getMidmonthCutoff,
  getMidmonthPayday,
  getMidmonthTransfer,
  getLastDateOfPayPeriod,
  getDateOfMasterPayroll,
  getDateOfMasterPayday,
  getDateOfMasterTransfer,
  getDateOfDirectDeposit,
  masterCutoffDate,
  isMasterCutoff,
  getPayPeriodOfDate,
  isWeekend,
  getAllNoCycles,
  isNoCycle,
  getMidMonthGreenCycles,
  getMasterGreenCycles,
  isGreenCycle,
  keyboardNavigation,
  increment,
  decrement,
};
