import type { ZodNumber } from 'zod';

import type { MockOptions } from '../types';
import { MAX_INTEGER, MIN_INTEGER, getRandomNumber } from '../utils';

/**
 * Generates valid number mocks
 * from the given ZodNumber definition
 *
 * @param field
 * @param options
 */
export const mockValid = (field: ZodNumber, options: MockOptions<number>) => {
  const min = field._def.minimum?.value || MIN_INTEGER;
  const max = field._def.maximum?.value || MAX_INTEGER;
  const integer = Boolean(field._def.isInteger);

  const numbers = {
    DEFAULT: getRandomNumber(min, max, integer, options.rng),
    MIN: min,
    MAX: max,
  };

  return numbers;
};

/**
 * Generates invalid number mocks
 * from the given ZodNumber definition
 *
 * @param field
 * @param options
 */
export const mockInvalid = (field: ZodNumber, options: MockOptions<number>) => {
  const integer = Boolean(field._def.isInteger);

  const strings: [string, string | number][] = [
    ['DEFAULT', 'not-a-number'],
  ];

  if (field._def.minimum) {
    const underMin = getRandomNumber(MIN_INTEGER, field._def.minimum.value - 1, false, options.rng);
    strings.push(['MIN', underMin]);
  }

  if (field._def.maximum) {
    const overMax = getRandomNumber(field._def.maximum.value + 1, MAX_INTEGER, false, options.rng);
    strings.push(['MAX', overMax]);
  }

  if (integer) {
    const float = getRandomNumber(field._def.minimum?.value || 0, field._def.maximum?.value || 20, true, options.rng) + 0.1;
    strings.push(['FLOAT', float]);
  }

  return Object.fromEntries(strings) as { DEFAULT: number } & Record<string, number>;
};
