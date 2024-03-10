import { parse } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { DISPLAY_TIME_FORMAT, TIMEZONE_FORMAT } from 'src/constants';

export function convertLocalTimeToUTC(
  localTime: string,
  timeZone: string = TIMEZONE_FORMAT
): string {
  const parsedLocalTime = parse(localTime, DISPLAY_TIME_FORMAT, new Date());

  const utcTime = utcToZonedTime(parsedLocalTime, timeZone);

  const hours = utcTime.getUTCHours();
  const minutes = utcTime.getUTCMinutes();

  const formattedUTC = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  return formattedUTC;
}
