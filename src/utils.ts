/**
 * Latin alphabet
 */
export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

export const MIN_INTEGER = Math.round(Number.MIN_SAFE_INTEGER / 3);
export const MAX_INTEGER = Math.round(Number.MAX_SAFE_INTEGER / 3);

/**
 * Returns a random element
 * from the given array
 *
 * @param origin
 */
export const getRandomElement = <T>(origin: T[]): T => {
  const index = Math.floor(Math.random() * origin.length);
  const item = origin[index];

  return item;
};

/**
 * Returns a random number between
 * the given min and the given max
 *
 * @param min
 * @param max
 * @param integer Whether the number should be an integer
 */
export const getRandomNumber = (min: number, max: number, integer = false): number => {
  const safeMin = Math.max(min, MIN_INTEGER);
  const safeMax = Math.min(max, MAX_INTEGER);

  const num = (Math.random() * (safeMax - safeMin)) + safeMin;

  if (integer) {
    return Math.floor(num);
  }

  return num;
};


/**
 * Returns a random string
 * of the given length
 *
 * @param length
 * @param alphabet
 */
export const getString = (length: number, alphabet = ALPHABET): string => {
  const elements = Array.from({ length }).map(() => getRandomElement(alphabet));

  return elements.join('');
};

/**
 * Returns a random string with
 * the given minLength and maxLength
 *
 * @param minLength
 * @param maxLength
 * @param alphabet
 */
export const getRandomString = (minLength: number, maxLength: number, alphabet = ALPHABET): string => {
  const length = getRandomNumber(minLength, maxLength, true);

  return getString(length, alphabet);
};
