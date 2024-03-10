import { Locale, format, formatDistance, parse } from 'date-fns';
import { BACKEND_DATE_FORMAT, DATE_FORMAT } from 'src/constants';

export const formatWorkExperienceDateRange = (
  startDate: string,
  endDate: string | null,
  translate: (translate: string) => string
): string => {
  const now = new Date();

  return `${format(parse(startDate, BACKEND_DATE_FORMAT, now), DATE_FORMAT)} — ${
    endDate === null
      ? translate('createAppointmentFourth.present')
      : format(parse(endDate, BACKEND_DATE_FORMAT, now), DATE_FORMAT)
  }`;
};

export const formatWorkExperienceDateRangeTenure = (
  startDate: string,
  endDate: string | null,
  locale: Locale
): string => {
  const now = new Date();

  return formatDistance(
    parse(startDate, BACKEND_DATE_FORMAT, now),
    endDate === null ? now : parse(endDate, BACKEND_DATE_FORMAT, now),
    { locale }
  );
};
