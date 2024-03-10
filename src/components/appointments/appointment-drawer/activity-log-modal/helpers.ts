import { format, getHours, getMinutes, isToday, isWithinInterval, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { APPOINTMENT_STATUS, APPOINTMENT_TYPE, USER_ROLE, UTC_TIMEZONE } from 'src/constants';
import { ActivityLogStatus } from 'src/redux/api/activityLogApi';
import { DetailedAppointment } from 'src/redux/api/appointmentApi';
import { UserRole } from 'src/redux/slices/userSlice';
import { getISODateWithoutUTC } from 'src/utils/getISODateWithoutUTC';
import { WEEKDAY_FORMAT } from './constants';

/**
 * Checks if the given day is a recurring working (recurring appointment will happen) day based on the weekday array.
 *
 * @param {Date} now - Date object
 * @param {string[]} weekday - ['Monday', 'Wednesday'].
 * @returns {boolean} True if the day is a recurring working day, false otherwise.
 */
const isRecurringWorkingDay = (now: Date, weekday: string[]): boolean =>
  weekday.includes(format(now, WEEKDAY_FORMAT));

/**
 * Checks if the current time is within the appointment date range interval.
 *
 * @param {Date} now - The current date and time.
 * @param {string} startDate - "2023-12-20T00:00:00.000Z"
 * @param {string} endDate - "2023-12-31T03:00:00.000Z"
 * @returns {boolean} True if the current time is within the appointment interval, false otherwise.
 */
const isWithinAppointmentInterval = (now: Date, startDate: string, endDate: string): boolean => {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  return isWithinInterval(now, { start, end });
};

/**
 * Checks if the activity log for the given appointment should be shown.
 *
 * @param {DetailedAppointment} appointment - The whole detailed appointment object.
 * @returns {boolean} True if the activity log should be shown, false otherwise.
 */
export const isActivityLogShown = (appointment: DetailedAppointment): boolean => {
  const { startDate, endDate, status, type, weekday: rawWeekday } = appointment;

  if (
    type === APPOINTMENT_TYPE.OneTime &&
    [APPOINTMENT_STATUS.Completed, APPOINTMENT_STATUS.Finished].includes(status)
  ) {
    return true;
  }

  const isAppointmentStatusAboutFinished = [
    APPOINTMENT_STATUS.Completed,
    APPOINTMENT_STATUS.Active,
    APPOINTMENT_STATUS.Finished,
  ].includes(status);

  if (type === APPOINTMENT_TYPE.Recurring && isAppointmentStatusAboutFinished) {
    const weekday: string[] = JSON.parse(rawWeekday as string);

    const now = utcToZonedTime(new Date(), UTC_TIMEZONE);
    const { isWorkingDay, hasPassedStartTime, hasPassedEndTime } = calculateDateInfo(
      now,
      startDate,
      endDate,
      weekday
    );

    return (
      isWorkingDay &&
      isWithinAppointmentInterval(now, startDate, endDate) &&
      (hasPassedEndTime || !hasPassedStartTime)
    );
  }

  return false;
};

/**
 * Calculates information about the given date in relation to an appointment.
 *
 * @param {Date} now - The current date and time.
 * @param {string} startDate - "2023-12-20T00:00:00.000Z"
 * @param {string} endDate - "2023-12-31T03:00:00.000Z"
 * @param {string[]} weekday - ['Monday', 'Wednesday'].
 * @returns {{isWorkingDay: boolean, hasPassedStartTime: boolean, hasPassedEndTime: boolean}} - {isWorkingDay: true, hasPassedStartTime: true, hasPassedEndTime: true}
 */
const calculateDateInfo = (
  now: Date,
  startDate: string,
  endDate: string,
  weekday: string[]
): {
  isWorkingDay: boolean;
  hasPassedStartTime: boolean;
  hasPassedEndTime: boolean;
} => {
  const start = parseISO(getISODateWithoutUTC(startDate));
  const end = parseISO(getISODateWithoutUTC(endDate));

  const isWorkingDay = isRecurringWorkingDay(now, weekday);

  const todayHour = getHours(now);
  const todayMinute = getMinutes(now);

  const startHour = getHours(start);
  const startMinute = getMinutes(start);

  const endHour = getHours(end);
  const endMinute = getMinutes(end);

  const hasPassedEndTime =
    todayHour > endHour || (todayHour === endHour && todayMinute >= endMinute);
  const hasPassedStartTime =
    todayHour > startHour || (todayHour === startHour && todayMinute >= startMinute);

  return { isWorkingDay, hasPassedStartTime, hasPassedEndTime };
};

/**
 * Checks if activity log buttons for the given appointment should be shown.
 *
 * @param {DetailedAppointment} appointment - The whole detailed appointment object.
 * @param {UserRole} role - 'Caregiver' | 'Seeker'
 * @returns {boolean} True if the activity log should be shown, false otherwise.
 */
export const isActivityLogReviewedShown = (
  appointment: DetailedAppointment,
  role: UserRole
): boolean => {
  const { activityLog, type, status, startDate, endDate, weekday: rawWeekday } = appointment;

  if (
    activityLog.length &&
    role === USER_ROLE.Caregiver &&
    type === APPOINTMENT_TYPE.OneTime &&
    [APPOINTMENT_STATUS.Completed, APPOINTMENT_STATUS.Finished].includes(status)
  ) {
    return true;
  }

  const now = utcToZonedTime(new Date(), UTC_TIMEZONE);

  if (
    role === USER_ROLE.Seeker &&
    [APPOINTMENT_STATUS.Completed, APPOINTMENT_STATUS.Active, APPOINTMENT_STATUS.Finished].includes(
      status
    ) &&
    activityLog.length &&
    activityLog.every((item) => item.status !== ActivityLogStatus.Pending)
  ) {
    return true;
  }

  if (
    isWithinAppointmentInterval(now, startDate, endDate) &&
    !!activityLog.length &&
    role === USER_ROLE.Caregiver &&
    type === APPOINTMENT_TYPE.Recurring &&
    [APPOINTMENT_STATUS.Completed, APPOINTMENT_STATUS.Active, APPOINTMENT_STATUS.Finished].includes(
      status
    )
  ) {
    const weekday: string[] = JSON.parse(rawWeekday as string);

    return (
      activityLog.some((item) => isToday(parseISO(getISODateWithoutUTC(item.createdAt)))) &&
      isRecurringWorkingDay(now, weekday)
    );
  }

  return false;
};
