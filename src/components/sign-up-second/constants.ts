import subYears from 'date-fns/subYears';
import { USER_MIN_AGE } from 'src/constants';

export const MAX_BIRTH_DATE = subYears(new Date(), USER_MIN_AGE);
export const MAX_PHONE_CHARACTERS = 12;
