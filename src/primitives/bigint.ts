import type { ZodBigInt } from 'zod';

import { MAX_INTEGER, MIN_INTEGER, getRandomNumber } from '../utils';

/**
 * Generates valid bigint mocks
 * from the given ZodBigInt definition
 *
 * @param _field
 */
export const mockValid = (_field: ZodBigInt) => {
  const min = MIN_INTEGER;
  const max = MAX_INTEGER;

  const numbers = {
    DEFAULT: BigInt(getRandomNumber(min, max, true)),
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
 */
export const mockInvalid = (_field: ZodBigInt) => {
  const min = MIN_INTEGER;
  const max = MAX_INTEGER;

  return {
    DEFAULT: 'not-a-number',
    NUMBER: getRandomNumber(min, max, true),
    FLOAT: getRandomNumber(min, max, true) + 0.1,
  };
};
