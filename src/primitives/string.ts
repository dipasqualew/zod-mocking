import { v4 as uuid4 } from 'uuid';
import type { ZodString } from 'zod';

import {
  getRandomEmail,
  getRandomString,
  getRandomUrl,
  getString,
} from '../utils';

/**
 * Generates valid string mocks
 * from the given ZodString definition
 *
 * @param field
 */
export const mockValid = (field: ZodString) => {
  const minLength = field._def.minLength?.value || 0;
  const maxLength = field._def.maxLength?.value || (minLength + 64);

  let generator = (min: number, max: number) => getRandomString(min, max);

  if (field._def.isUUID) {
    // UUIDs are fix length
    // return immediately
    return {
      DEFAULT: uuid4(),
    };
  }

  if (field._def.isEmail) {
    generator = (min: number, max: number) => getRandomEmail(min, max);
  }

  if (field._def.isURL) {
    generator = (min: number, max: number) => getRandomUrl(min, max);
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
 */
export const mockInvalid = (field: ZodString) => {
  const minLength = field._def.minLength?.value || 0;

  const strings: [string, string | null][] = [
    ['DEFAULT', null],
  ];

  if (minLength > 0) {
    strings.push(['MIN', getString(minLength - 1)]);
  }

  if (field._def.maxLength) {
    strings.push(['MAX', getString(field._def.maxLength.value + 1)]);
  }

  return Object.fromEntries(strings) as { DEFAULT: string } & Record<string, string>;
};
