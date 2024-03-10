import { generateTimeWithInterval } from 'src/utils/generateTime';

const MIN_APPOINTMENT_NAME_LENGTH = 5;
const MAX_APPOINTMENT_NAME_LENGTH = 50;
const MINUTES_INTERVAL = 15;
const ONE_DAY = 1;
const ONE_HOUR_INTERVAL_INDEX = 4;
const MIN_APPOINTMENT_HOUR_DURATION = 1;
const FIRST_WEEK_DAY_IDX = 0;
const LAST_WEEK_DAY_IDX = -1;
const MIN_HOURS_BEFORE_APPOINTMENT = 6;

const borderlineHours = generateTimeWithInterval('23:00', '00:00', MINUTES_INTERVAL);
const lateStartHours = generateTimeWithInterval('23:15', '23:45', MINUTES_INTERVAL);
const nextDayHours = generateTimeWithInterval('00:15', '00:45', MINUTES_INTERVAL);

const selectTimeOptions = generateTimeWithInterval('00:00', '23:45', MINUTES_INTERVAL);

export {
  MIN_APPOINTMENT_NAME_LENGTH,
  MAX_APPOINTMENT_NAME_LENGTH,
  MIN_APPOINTMENT_HOUR_DURATION,
  ONE_DAY,
  ONE_HOUR_INTERVAL_INDEX,
  FIRST_WEEK_DAY_IDX,
  LAST_WEEK_DAY_IDX,
  MIN_HOURS_BEFORE_APPOINTMENT,
  selectTimeOptions,
  borderlineHours,
  lateStartHours,
  nextDayHours,
};
