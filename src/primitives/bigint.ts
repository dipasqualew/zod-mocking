import type { ZodBigInt } from 'zod';

import type { MockOptions } from '../types';
import { MAX_INTEGER, MIN_INTEGER, getRandomNumber } from '../utils';

/**
 * Generates valid bigint mocks
 * from the given ZodBigInt definition
 *
 * @param _field
 * @param options
 */
export const mockValid = (_field: ZodBigInt, options: MockOptions<BigInt>) => {
  const min = MIN_INTEGER;
  const max = MAX_INTEGER;

  const numbers = {
    DEFAULT: BigInt(getRandomNumber(min, max, true, options.rng)),
    MIN: BigInt(min),
    MAX: BigInt(max),
  };

  return numbers;
};

/**
 * Generates invalid bigint mocks
 * from the given ZodBigInt definition
 *
 * @param _field
 * @param options
 */
export const mockInvalid = (_field: ZodBigInt, options: MockOptions<BigInt>) => {
  const min = MIN_INTEGER;
  const max = MAX_INTEGER;

  return {
    DEFAULT: 'not-a-number',
    NUMBER: getRandomNumber(min, max, true, options.rng),
    FLOAT: getRandomNumber(min, max, true, options.rng) + 0.1,
  };
};
