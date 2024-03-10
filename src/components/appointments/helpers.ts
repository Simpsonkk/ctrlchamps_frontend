import { parseISO, differenceInHours } from 'date-fns';

export const getHoursForWeek = (startDate: string, endDate: string): number =>
  differenceInHours(parseISO(startDate), parseISO(endDate));
