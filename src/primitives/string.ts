import type { ZodString } from 'zod';

import type { MockOptions } from '../types';
import {
  ALPHABET,
  getRandomEmail,
  getRandomString,
  getRandomUrl,
  getString,
  getUUID,
} from '../utils';

/**
 * Generates valid string mocks
 * from the given ZodString definition
 *
 * @param field
 * @param options
 */
export const mockValid = (field: ZodString, options: MockOptions<string>) => {
  const minLength = field._def.minLength?.value || 0;
  const maxLength = field._def.maxLength?.value || (minLength + 64);

  let generator = (min: number, max: number) => getRandomString(min, max, ALPHABET, options.rng);

  if (field._def.isUUID) {
    // UUIDs are fix length
    // return immediately
    return {
      DEFAULT: getUUID(options.rng),
    };
  }

  if (field._def.isEmail) {
    generator = (min: number, max: number) => getRandomEmail(min, max, 'example.com', options.rng);
  }

  if (field._def.isURL) {
    generator = (min: number, max: number) => getRandomUrl(min, max, 'example.com', options.rng);
  }

  const strings = {
    DEFAULT: generator(minLength, maxLength),
    MIN: generator(minLength, maxLength),
    MAX: generator(maxLength, maxLength),
  };

  return strings;
};

/**
 * Generates invalid string mocks
 * from the given ZodString definition
 *
 * @param field
 * @param options
 */
export const mockInvalid = (field: ZodString, options: MockOptions<string>) => {
  const minLength = field._def.minLength?.value || 0;

  const strings: [string, string | null][] = [
    ['DEFAULT', null],
  ];

  if (minLength > 0) {
    strings.push(['MIN', getString(minLength - 1, ALPHABET, options.rng)]);
  }

  if (field._def.maxLength) {
    strings.push(['MAX', getString(field._def.maxLength.value + 1, ALPHABET, options.rng)]);
  }

  return Object.fromEntries(strings) as { DEFAULT: string } & Record<string, string>;
};
