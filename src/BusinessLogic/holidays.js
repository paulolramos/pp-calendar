import {
  isWeekend,
  getPayPeriodOfDate,
  increment,
  decrement,
} from "./functions";

const newYears = year => {
  let newYearsDate = new Date(year, 0, 1);
  const newYearsDayOfTheWeek = newYearsDate.getDay();

  if (newYearsDayOfTheWeek === 6) {
    newYearsDate = decrement(newYearsDate);
  } else if (newYearsDayOfTheWeek === 0) {
    newYearsDate = increment(newYearsDate);
  }
  return newYearsDate;
};

const martinLutherKing = year => {
  let mlkDate = new Date(year, 0, 1);
  let mlkDayOfTheWeek = mlkDate.getDay();

  while (mlkDayOfTheWeek !== 1) {
    mlkDate = increment(mlkDate);
    mlkDayOfTheWeek = mlkDate.getDay();
  }

  mlkDate.setDate(mlkDate.getDate() + 14);
  return mlkDate;
};

// CSUCO moves this day to December break
const presidents = year => {
  let presidentsDate = new Date(year, 1, 1);
  let presidentsDayOfTheWeek = presidentsDate.getDay();

  while (presidentsDayOfTheWeek !== 1) {
    presidentsDate = increment(presidentsDate);
    presidentsDayOfTheWeek = presidentsDate.getDay();
  }
  presidentsDate.setDate(presidentsDate.getDate() + 14);
  return presidentsDate;
};

const cesarChavez = year => {
  let cesarChavezDate = new Date(year, 2, 31);
  const cesarChavezDayOfTheWeek = cesarChavezDate.getDay();

  if (cesarChavezDayOfTheWeek === 6) {
    cesarChavezDate = decrement(cesarChavezDate);
  } else if (cesarChavezDayOfTheWeek === 0) {
    cesarChavezDate = increment(cesarChavezDate);
  }
  return cesarChavezDate;
};

const memorial = year => {
  let memorialDate = new Date(year, 5, 1);
  let memorialDayOfTheWeek = memorialDate.getDay();

  while (memorialDayOfTheWeek !== 1) {
    memorialDate = increment(memorialDate);
    memorialDayOfTheWeek = memorialDate.getDay();
  }
  memorialDate.setDate(memorialDate.getDate() - 7);
  return memorialDate;
};

const independence = year => {
  let independenceDate = new Date(year, 6, 4);
  const independenceDayOfTheWeek = independenceDate.getDay();

  if (independenceDayOfTheWeek === 6) {
    independenceDate = decrement(independenceDate);
  } else if (independenceDayOfTheWeek === 0) {
    independenceDate = increment(independenceDate);
  }
  return independenceDate;
};

const labor = year => {
  let laborDate = new Date(year, 8, 1);
  let laborDayOfTheWeek = laborDate.getDay();

  while (laborDayOfTheWeek !== 1) {
    laborDate = increment(laborDate);
    laborDayOfTheWeek = laborDate.getDay();
  }
  return laborDate;
};

const veterans = year => {
  let veteransDate = new Date(year, 10, 11);
  const veteransDayOfTheWeek = veteransDate.getDay();

  if (veteransDayOfTheWeek === 6) {
    veteransDate = decrement(veteransDate);
  } else if (veteransDayOfTheWeek === 0) {
    veteransDate = increment(veteransDate);
  }
  return veteransDate;
};

const thanksgiving = year => {
  let thanksgivingDate = new Date(year, 10, 1);
  let thanksgivingDayOfTheWeek = thanksgivingDate.getDay();

  while (thanksgivingDayOfTheWeek !== 4) {
    thanksgivingDate = increment(thanksgivingDate);
    thanksgivingDayOfTheWeek = thanksgivingDate.getDay();
  }
  thanksgivingDate.setDate(thanksgivingDate.getDate() + 21);
  return thanksgivingDate;
};

// CSU specific (Day after Thanksgiving)
const admissions = year => {
  let admissionsDate = thanksgiving(year);
  admissionsDate = increment(admissionsDate);
  return admissionsDate;
};

const christmas = year => {
  let christmasDate = new Date(year, 11, 25);
  const christmasDayOfTheWeek = christmasDate.getDay();

  if (christmasDayOfTheWeek === 6) {
    christmasDate = decrement(christmasDate);
  } else if (christmasDayOfTheWeek === 0) {
    christmasDate = increment(christmasDate);
  }
  return christmasDate;
};

// formerly columbus' day
const indigenousPeoples = year => {
  let indigenousPeoplesDate = new Date(year, 9, 1);
  let indigenousPeoplesDayOfTheWeek = indigenousPeoplesDate.getDay();

  while (indigenousPeoplesDayOfTheWeek !== 1) {
    indigenousPeoplesDate = increment(indigenousPeoplesDate);
    indigenousPeoplesDayOfTheWeek = indigenousPeoplesDate.getDay();
  }
  indigenousPeoplesDate.setDate(indigenousPeoplesDate.getDate() + 7);
  return indigenousPeoplesDate;
};

// Actual date lands on Feb 12 of every year
const lincoln = year => {
  let lincolnDate = new Date(year, 1, 12);
  const lincolnDayOfTheWeek = lincolnDate.getDay();

  if (lincolnDayOfTheWeek === 6) {
    lincolnDate = decrement(lincolnDate);
  } else if (lincolnDayOfTheWeek === 0) {
    lincolnDate = increment(lincolnDate);
  }
  return lincolnDate;
};

const getAllHolidays = year => [
  newYears(year),
  martinLutherKing(year),
  presidents(year),
  cesarChavez(year),
  memorial(year),
  independence(year),
  labor(year),
  veterans(year),
  thanksgiving(year),
  admissions(year),
  christmas(year),
];

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
