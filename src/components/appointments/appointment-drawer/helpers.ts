import { ONE_DAY } from 'src/constants';

const convertWeekdayToNumber = (weekday: string): number => {
  const mapping = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  return mapping[weekday as keyof typeof mapping];
};

export const findNextAppointmentDay = (
  endDate: Date,
  weekday: string,
  currentDate: Date
): Date => {
  const weekdayNumbers = JSON.parse(weekday).map((day: string): number =>
    convertWeekdayToNumber(day)
  );

  while (currentDate.getTime() <= endDate.getTime()) {
    if (weekdayNumbers.includes(currentDate.getDay())) {
      return currentDate;
    }
    currentDate.setDate(currentDate.getDate() + ONE_DAY);
  }

  while (true) {
    if (weekdayNumbers.includes(currentDate.getDay())) {
      return currentDate;
    }
    currentDate.setDate(currentDate.getDate() - ONE_DAY);
  }

};
