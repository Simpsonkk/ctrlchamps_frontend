import { addHours, isWithinInterval, parse } from 'date-fns';
import { CURRENT_DAY, DISPLAY_TIME_FORMAT } from 'src/constants';

/**
 * Checks if the appointment time is within the specified interval for today.
 *
 * @param time '10:00' - The start time of the appointment.
 * @param hoursInterval 1 - The interval in hours.
 * @returns {boolean} - True if the appointment time is within the specified interval, false otherwise.
 */

export const checkIfTodayAppointmentWithinInterval = (
  time: string,
  hoursInterval: number
): boolean => {
  const chosenDateTime = parse(time, DISPLAY_TIME_FORMAT, CURRENT_DAY);
  const futureDate = addHours(CURRENT_DAY, hoursInterval);
  const interval = {
    start: CURRENT_DAY,
    end: futureDate,
  };

  const isTimeWithinInterval = isWithinInterval(chosenDateTime, interval);

  return isTimeWithinInterval;
};
