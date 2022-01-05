import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

import type { RNG, Seed } from './types';

/**
 * Latin alphabet
 */
export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

export const MIN_INTEGER = Math.round(Number.MIN_SAFE_INTEGER / 3);
export const MAX_INTEGER = Math.round(Number.MAX_SAFE_INTEGER / 3);
export const UUID_NAMESPACE = 'ffe92c7d-e22c-4935-a798-671a4b3742e4';


/**
 * Casts a string to a number.
 * The number is not unique per string,
 * so this function should not be used where unique
 * values are expected.
 *
 * @param str
 */
export const arbitraryStringToNumber = (str: string) => {
  return str.split('').reduce((acc, current) => acc + current.charCodeAt(0), 0);
};

/**
 * Casts an object to a number.
 * The number is not unique per object,
 * so this function should not be used where unique
 * values are expected.
 *
 * @param obj
 */
export const arbitraryObjectToNumber = (obj: unknown) => {
  return arbitraryStringToNumber(JSON.stringify(obj));
};

/**
 * Creates a fairly simple RNG
 * from the given seed.
 * See: https://stackoverflow.com/a/47593316
 *
 * @param seed
 */
export const mulberry32 = (seed: number) => {
  let hoisted = seed;
  /* eslint-disable no-bitwise */
  return () => {
    hoisted += 0x6D2B79F5;
    let t = hoisted;

    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
};

/**
 * Returns a random number generator
 * given a seed:
 *
 * - If seed is `true` or a number
 *   it returns the associated mulberry32 (bool is casted)
 *
 * - If seed is `null` it returns Math.random
 *
 * @param seed
 */
export const getRng = (seed: Seed): RNG => {
  if (seed === null) {
    return Math.random;
  }

  return mulberry32(Number(seed));
};


/**
 * Returns a random element
 * from the given array
 *
 * @param origin
 * @param rng
 */
export const getRandomElement = <T>(origin: T[], rng: RNG = Math.random): T => {
  const index = Math.floor(rng() * origin.length);
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
 * @param rng
 */
export const getRandomNumber = (min: number, max: number, integer = false, rng: RNG = Math.random): number => {
  const safeMin = Math.max(min, MIN_INTEGER);
  const safeMax = Math.min(max, MAX_INTEGER);

  const num = (rng() * (safeMax - safeMin)) + safeMin;

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
 * @param rng
 */
export const getString = (length: number, alphabet = ALPHABET, rng: RNG = Math.random): string => {
  const elements = Array.from({ length }).map(() => getRandomElement(alphabet, rng));

  return elements.join('');
};

/**
 * Returns a random string with
 * the given minLength and maxLength
 *
 * @param minLength
 * @param maxLength
 * @param alphabet
 * @param rng
 */
export const getRandomString = (minLength: number, maxLength: number, alphabet = ALPHABET, rng: RNG = Math.random): string => {
  const length = getRandomNumber(minLength, maxLength, true, rng);

  return getString(length, alphabet, rng);
};

/**
 * Generates an email with the given
 * constraints
 *
 * @param minLength
 * @param maxLength
 * @param domain
 * @param rng
 */
export const getRandomEmail = (minLength: number, maxLength: number, domain = 'example.com', rng: RNG = Math.random) => {
  const normalisedMinlength = Math.max(1, minLength - domain.length - 1); // remove @ and domain length
  const normalisedMaxLength = Math.max(1, maxLength - domain.length - 1); // remove @ and domain length

  const user = getRandomString(normalisedMinlength, normalisedMaxLength, ALPHABET, rng);

  return `${user}@${domain}`;
};

/**
 * Generates a random URL with the given
 * constraints
 *
 * @param minLength
 * @param maxLength
 * @param domain
 * @param rng
 */
export const getRandomUrl = (minLength: number, maxLength: number, domain = 'example.com', rng: RNG = Math.random) => {
  const normalisedMinlength = Math.max(1, minLength - domain.length - 9); // remove https://, domain length and initial slash
  const normalisedMaxLength = Math.max(1, maxLength - domain.length - 9); // remove https://, domain length and initial slash

  const path = getRandomString(normalisedMinlength, normalisedMaxLength, ALPHABET, rng);

  return `https://${domain}/${path}`;
};

export type DateVariance = 'hour' | 'day' | 'week';

/**
 * Generates a random Date with the given
 * constraints
 *
 * @param variance Maximum variance from the base (Defaults to a 24h)
 * @param rng
 */
export const getRandomDate = (variance: DateVariance, rng: RNG = Math.random) => {
  const varianceValue = {
    hour: 3600,
    day: 86400000,
    week: 604800000,
  }[variance];

  const multiplier = (rng() - 0.5) * 2; // get a number between -1 and 1

  let start = Date.now();

  if (rng !== Math.random) {
    // If we have a seed, scrap Date.now and be deterministic
    // Sun Mar 28 2021 12:38:18 GMT+0100 (British Summer Time)
    start = 1616931407502;
  }
  const unix = start + (varianceValue * multiplier);

  return new Date(unix);
};

/**
 * Returns a UUID
 *
 * If seed is defined, it uses UUID v5
 * for deterministic UUIDs
 *
 * @param rng
 */
export const getUUID = (rng: RNG = Math.random) => {
  if (rng === Math.random) {
    return uuidv4();
  }

  const name = String(rng());

  return uuidv5(name, UUID_NAMESPACE);
};

/**
 * Narrows
 *
 * @param discriminantKey
 * @param discriminantValue
 * @see https://stackoverflow.com/questions/59050071/narrow-return-type-of-find-from-discriminated-union-array
 */
export const isDiscriminate = <K extends PropertyKey, V extends string | number | boolean>(
  discriminantKey: K,
  discriminantValue: V | V[],
) => <T extends Record<K, any>>(
    obj: T & Record<K, V extends T[K] ? T[K] : V>,
  ): obj is Extract<T, Record<K, V>> => (Array.isArray(discriminantValue)
      ? discriminantValue.some((v) => obj[discriminantKey] === v)
      : obj[discriminantKey] === discriminantValue);

/**
 * Narrows
 *
 * @param discriminantKey
 * @param discriminantValue
 * @see https://stackoverflow.com/questions/59050071/narrow-return-type-of-find-from-discriminated-union-array
 */
export function isNotDiscriminate<
  K extends PropertyKey,
  V extends string | number | boolean
>(discriminantKey: K, discriminantValue: V | V[]) {
  return <T extends Record<K, any>>(
    obj: T & Record<K, V extends T[K] ? T[K] : V>,
  ): obj is Exclude<T, Record<K, V>> => (Array.isArray(discriminantValue)
    ? discriminantValue.some((v) => obj[discriminantKey] === v)
    : obj[discriminantKey] === discriminantValue);
}
