import { ASCI_LETTERS_RANGE, ASCI_LETTERS_START, MIN_PASSWORD_LENGTH } from 'src/constants';

/**
 * Generates a random password with the specified length using ASCII letters.
 *
 * @param {number} [length=MIN_PASSWORD_LENGTH] - The length of the password. Defaults to MIN_PASSWORD_LENGTH.
 * @returns {string} - The randomly generated password. example: 0+PfmMXV
 */
export const generatePassword = (length: number = MIN_PASSWORD_LENGTH): string =>
  Array.from({ length }, () =>
    String.fromCharCode(Math.floor(Math.random() * ASCI_LETTERS_RANGE) + ASCI_LETTERS_START)
  ).join('');
