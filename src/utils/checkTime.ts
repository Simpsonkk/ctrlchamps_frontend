import { isAfter, parse } from 'date-fns';
import { CURRENT_DAY, DISPLAY_TIME_FORMAT } from 'src/constants';

// checks if the selected time is after the current time
// @param selectedTime - '18:00' but locally it is '20:00'
// @return -  false

export function isTimeAfterNow(selectedTime: string): boolean {
  const now = CURRENT_DAY;
  const selectedDateTime = parse(selectedTime, DISPLAY_TIME_FORMAT, now);

  return isAfter(selectedDateTime, now);
}
