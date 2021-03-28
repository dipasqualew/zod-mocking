import type { ZodDate } from 'zod';

import type { MockOptions } from '../types';
import { getRandomDate } from '../utils';

/**
 * Generates valid boolean mocks
 * from the given ZodDate definition
 *
 * @param _field
 * @param options
 */
export const mockValid = (_field: ZodDate, options: MockOptions<Date>) => {
  const booleans = {
    DEFAULT: getRandomDate('week', options.rng),
  };

  return booleans;
};

/**
 * Generates invalid boolean mocks
 * from the given ZodDate definition
 *
 * @param _field
 * @param _options
 */
export const mockInvalid = (_field: ZodDate, _options: MockOptions<Date>) => {
  const booleans = {
    DEFAULT: 'not-a-date',
    INVALID_DATE: new Date('not-a-date'),
  };

  return booleans;
};
