import { DATE_FORMAT } from 'src/constants';
import { format } from 'date-fns';

export const DRAWER_DATE_FORMAT = 'dd MMM, HH:mm';
export const SECONDS_AND_MILISECONDS = '00.000Z';
export const DRAWER_DATE_FORMAT_WITH_TIMEZONE = 'dd MMM, HH:mm z';
export const CURRENT_DATE = format(Date.now(), DATE_FORMAT);
export const PAYMENT_DAY = '1 day';
export const MILEAGE_PRICE = 0.2;
export const RENT_PRICE = 400;
