import { UTC_BIAS } from 'src/constants';

/**
 * Removes the UTC bias (Z at the end) from the provided ISO date string
 *
 * @param {string} date - 2023-12-31T03:00:00.000Z
 * @returns {string} - 2023-12-31T03:00:00.000
 */
export const getISODateWithoutUTC = (date: string): string => date.replace(UTC_BIAS, '');
