import { generateTimeWithInterval } from 'src/utils/generateTime';

const MINUTES_INTERVAL = 60;
const PLUS_HOUR = 1;
const FIRST_ELEMENT = 0;

const availableTimeOptions = generateTimeWithInterval('00:00', '23:45', MINUTES_INTERVAL);

export { availableTimeOptions, PLUS_HOUR, FIRST_ELEMENT };
