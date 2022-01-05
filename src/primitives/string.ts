import type { ZodString } from 'zod';

import type { MockOptions } from '../types';
import {
  ALPHABET,
  getRandomEmail,
  getRandomString,
  getRandomUrl,
  getString,
  getUUID,
  isDiscriminate,
} from '../utils';

/**
 * Generates valid string mocks
 * from the given ZodString definition
 *
 * @param field
 * @param options
 */
export const mockValid = (field: ZodString, options: MockOptions<string>) => {
  const minKind = field._def.checks.find(isDiscriminate('kind', 'min'));
  const minLength = minKind?.value || 0;

  const maxKind = field._def.checks.find(isDiscriminate('kind', 'max'));
  const maxLength = maxKind?.value || (minLength + 64);

  if (field.isUUID) {
    // UUIDs are fix length
    // return immediately
    return {
      DEFAULT: getUUID(options.rng),
    };
  }

  let generator = (min: number, max: number) => getRandomString(min, max, ALPHABET, options.rng);
  if (field.isEmail) {
    generator = (min: number, max: number) => getRandomEmail(min, max, 'example.com', options.rng);
  }
  if (field.isURL) {
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
  const minKind = field._def.checks.find(isDiscriminate('kind', 'min'));
  const minLength = minKind?.value || 0;

  const strings: [string, string | null][] = [
    ['DEFAULT', null],
  ];

  if (minLength > 0) {
    strings.push(['MIN', getString(minLength - 1, ALPHABET, options.rng)]);
  }

  const maxKind = field._def.checks.find(isDiscriminate('kind', 'max'));
  if (maxKind) {
    strings.push(['MAX', getString(maxKind.value + 1, ALPHABET, options.rng)]);
  }

  return Object.fromEntries(strings) as { DEFAULT: string } & Record<string, string>;
};
