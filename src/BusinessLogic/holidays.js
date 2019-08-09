import { isWeekend, getPayPeriodOfDate } from "./functions";

Date.prototype.Increment = function() {
  this.setDate(this.getDate() + 1);
};
Date.prototype.Decrement = function() {
  this.setDate(this.getDate() - 1);
};

const newYears = year => {
  const newYearsDate = new Date(year, 0, 1);
  const newYearsDayOfTheWeek = newYearsDate.getDay();
  if (newYearsDayOfTheWeek === 0) newYearsDate.Increment();
  return newYearsDate;
};

const martinLutherKing = year => {
  const mlkDate = new Date(year, 0, 1);
  let mlkDayOfTheWeek = mlkDate.getDay();

  while (mlkDayOfTheWeek !== 1) {
    mlkDate.Increment();
    mlkDayOfTheWeek = mlkDate.getDay();
  }
  mlkDate.setDate(mlkDate.getDate() + 14);
  return mlkDate;
};

// CSUCO moves this day to December break
const presidents = year => {
  const presidentsDate = new Date(year, 1, 1);
  let presidentsDayOfTheWeek = presidentsDate.getDay();

  while (presidentsDayOfTheWeek !== 1) {
    presidentsDate.Increment();
    presidentsDayOfTheWeek = presidentsDate.getDay();
  }
  presidentsDate.setDate(presidentsDate.getDate() + 14);
  return presidentsDate;
};

const cesarChavez = year => {
  const cesarChavezDate = new Date(year, 2, 31);
  const cesarChavezDayOfTheWeek = cesarChavezDate.getDay();
  if (cesarChavezDayOfTheWeek === 0) cesarChavezDate.Increment();
  return cesarChavezDate;
};

const memorial = year => {
  const memorialDate = new Date(year, 5, 1);
  let memorialDayOfTheWeek = memorialDate.getDay();

  while (memorialDayOfTheWeek !== 1) {
    memorialDate.Increment();
    memorialDayOfTheWeek = memorialDate.getDay();
  }
  memorialDate.setDate(memorialDate.getDate() - 7);
  return memorialDate;
};

const independence = year => {
  const independenceDate = new Date(year, 6, 4);
  const independenceDayOfTheWeek = independenceDate.getDay();

  if (independenceDayOfTheWeek === 0) independenceDate.Increment();
  return independenceDate;
};

const labor = year => {
  const laborDate = new Date(year, 8, 1);
  let laborDayOfTheWeek = laborDate.getDay();

  while (laborDayOfTheWeek !== 1) {
    laborDate.Increment();
    laborDayOfTheWeek = laborDate.getDay();
  }
  return laborDate;
};

const veterans = year => {
  const veteransDate = new Date(year, 10, 11);
  const veteransDayOfTheWeek = veteransDate.getDay();
  if (veteransDayOfTheWeek === 6) {
    veteransDate.Decrement();
  } else if (veteransDayOfTheWeek === 0) {
    veteransDate.Increment();
  }
  return veteransDate;
};

const thanksgiving = year => {
  const thanksgivingDate = new Date(year, 10, 1);
  let thanksgivingDayOfTheWeek = thanksgivingDate.getDay();

  while (thanksgivingDayOfTheWeek !== 4) {
    thanksgivingDate.Increment();
    thanksgivingDayOfTheWeek = thanksgivingDate.getDay();
  }
  thanksgivingDate.setDate(thanksgivingDate.getDate() + 21);
  return thanksgivingDate;
};

// CSU specific (Day after Thanksgiving)
const admissions = year => {
  const admissionsDate = thanksgiving(year);
  admissionsDate.Increment();
  return admissionsDate;
};

// ! this doesn't check if christmas lands on saturday
const christmas = year => {
  const christmasDate = new Date(year, 11, 25);
  const christmasDayOfTheWeek = christmasDate.getDay();
  if (christmasDayOfTheWeek === 0) christmasDate.Increment();
  return christmasDate;
};

// formerly columbus' day
const indigenousPeoples = year => {
  const indigenousPeoplesDate = new Date(year, 9, 1);
  let indigenousPeoplesDayOfTheWeek = indigenousPeoplesDate.getDay();

  while (indigenousPeoplesDayOfTheWeek !== 1) {
    indigenousPeoplesDate.Increment();
    indigenousPeoplesDayOfTheWeek = indigenousPeoplesDate.getDay();
  }
  indigenousPeoplesDate.setDate(indigenousPeoplesDate.getDate() + 7);
  return indigenousPeoplesDate;
};

// Actual date lands on Feb 12 of every year
const lincoln = year => new Date(year, 1, 12);

const getAllHolidays = year => {
  const holidays = [];
  holidays[0] = newYears(year);
  holidays[1] = martinLutherKing(year);
  holidays[2] = presidents(year);
  holidays[3] = cesarChavez(year);
  holidays[4] = memorial(year);
  holidays[5] = independence(year);
  holidays[6] = labor(year);
  holidays[7] = veterans(year);
  holidays[8] = thanksgiving(year);
  holidays[9] = admissions(year);
  holidays[10] = christmas(year);
  return holidays;
};

const getHolidaysForMonth = (payperiod, year) => {
  let holidayCount = 0;
  const holidayInMonth = [];

  const allHolidays = getAllHolidays(year);
  allHolidays.forEach(holiday => {
    if (getPayPeriodOfDate(holiday) === payperiod) {
      if (isWeekend(holiday) === false) {
        holidayInMonth[holidayCount] = new Date(holiday);
        // eslint-disable-next-line no-plusplus
        holidayCount++;
      }
    }
  });
  return holidayInMonth;
};

const checkIfHoliday = date => {
  const allHolidays = getAllHolidays(date.getFullYear());
  let isHoliday = false;

  allHolidays.forEach(holiday => {
    if (holiday.valueOf() === date.valueOf()) {
      isHoliday = true;
    }
  });
  return isHoliday;
};

export {
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
  getAllHolidays,
  checkIfHoliday,
  getHolidaysForMonth,
};
