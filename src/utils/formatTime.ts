import { format, getTime, formatDistanceToNow } from 'date-fns';
import { utcToZonedTime, format as formatTz, zonedTimeToUtc } from 'date-fns-tz';
import { UTC_TIMEZONE } from 'src/constants';
// ----------------------------------------------------------------------

type InputValue = Date | string | number | null;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

// function to format time in ISO format to specified timezone and time format

//  @param dateTime - '2023-12-14T18:00:00.000Z'
//  @param targetTimezone - 'America/New_York'
//  @param timeFormat - 'yyyy-MM-dd HH:mm:ss'
//  @return - '2023-12-14 12:00:00'
export function formatTimeToTimezone(
  dateTime: string,
  targetTimezone: string,
  timeFormat: string
): string {
  const inputDateTime = new Date(dateTime);
  const adjustedDateTime = utcToZonedTime(inputDateTime, targetTimezone);

  const formattedDateTime = formatTz(adjustedDateTime, timeFormat, {
    timeZone: targetTimezone,
  });

  return formattedDateTime;
}

// function to format UTC time to specified timezone and time format
// @param dateTime - '2023-12-14T18:00:00.000Z'
// @param timeFormat - 'yyyy-MM-dd HH:mm:ss'
// @return - '2023-12-14 12:00:00'
export function formatUTCToTimezone(dateTime: string, timeFormat: string): string {
  const inputDateTime = new Date(dateTime);
  const adjustedDateTime = zonedTimeToUtc(inputDateTime, UTC_TIMEZONE);

  const formattedDateTime = formatTz(adjustedDateTime, timeFormat);

  return formattedDateTime;
}
