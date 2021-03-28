import type { ZodBoolean } from 'zod';

import type { MockOptions } from '../types';

/**
 * Generates valid boolean mocks
 * from the given ZodBoolean definition
 *
 * @param _field
 * @param _options
 */
export const mockValid = (_field: ZodBoolean, _options: MockOptions<boolean>) => {
  const booleans = {
    DEFAULT: true,
    TRUE: true,
    FALSE: false,
  };

  return booleans;
};

/**
 * Generates invalid boolean mocks
 * from the given ZodBoolean definition
 *
 * @param _field
 * @param _options
 */
export const mockInvalid = (_field: ZodBoolean, _options: MockOptions<boolean>) => {
  const booleans = {
    DEFAULT: NaN,
  };

  return booleans;
};
