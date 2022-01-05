import type { ZodNumber } from 'zod';

import type { MockOptions } from '../types';
import {
  MAX_INTEGER, MIN_INTEGER, getRandomNumber, isDiscriminate,
} from '../utils';

/**
 * Generates valid number mocks
 * from the given ZodNumber definition
 *
 * @param field
 * @param options
 */
export const mockValid = (field: ZodNumber, options: MockOptions<number>) => {
  const minKind = field._def.checks.find(isDiscriminate('kind', 'min'));
  let min = minKind?.value ?? MIN_INTEGER;
  if (!minKind?.inclusive) {
    min += 1;
  }

  const maxKind = field._def.checks.find(isDiscriminate('kind', 'max'));
  let max = maxKind?.value ?? MAX_INTEGER;
  if (!maxKind?.inclusive) {
    max -= 1;
  }

  return {
    DEFAULT: getRandomNumber(min, max, field.isInt, options.rng),
    MIN: min,
    MAX: max,
  };
};

/**
 * Generates invalid number mocks
 * from the given ZodNumber definition
 *
 * @param field
 * @param options
 */
export const mockInvalid = (field: ZodNumber, options: MockOptions<number>) => {
  const integer = field.isInt;

  const strings: [string, string | number][] = [['DEFAULT', 'not-a-number']];

  const minKind = field._def.checks.find(isDiscriminate('kind', 'min'));
  if (minKind) {
    const underMin = getRandomNumber(
      MIN_INTEGER,
      minKind.value - 1,
      false,
      options.rng,
    );
    strings.push(['MIN', underMin]);
  }

  const maxKind = field._def.checks.find(isDiscriminate('kind', 'max'));
  if (maxKind) {
    const overMax = getRandomNumber(
      maxKind.value + 1,
      MAX_INTEGER,
      false,
      options.rng,
    );
    strings.push(['MAX', overMax]);
  }

  if (integer) {
    const float = getRandomNumber(
      minKind?.value || 0,
      maxKind?.value || 20,
      true,
      options.rng,
    ) + 0.1;
    strings.push(['FLOAT', float]);
  }

  return Object.fromEntries(strings) as { DEFAULT: number } & Record<
    string,
    number
  >;
};
