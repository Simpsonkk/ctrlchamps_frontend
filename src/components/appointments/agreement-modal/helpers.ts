import { format, parseISO } from 'date-fns';
import { DISPLAY_TIME_FORMAT, ONE_HOUR } from 'src/constants';

export const countHoursPerWeek = (
  startDate: string,
  endDate: string,
  weekDays: string[]
): number => {
  const startTime = format(parseISO(startDate), DISPLAY_TIME_FORMAT);
  const endTime = format(parseISO(endDate), DISPLAY_TIME_FORMAT);
  const weekDaysCount = weekDays.length;

  const parseTime = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);

    return hours * ONE_HOUR + minutes;
  };

  const differenceInHoursValue = (parseTime(endTime) - parseTime(startTime)) / ONE_HOUR;

  const hoursPerWeek = weekDaysCount * differenceInHoursValue;

  return hoursPerWeek;
};
