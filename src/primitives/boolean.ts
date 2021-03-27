import type { ZodBoolean } from 'zod';

/**
 * Generates valid boolean mocks
 * from the given ZodBoolean definition
 *
 * @param _field
 */
export const mockValid = (_field: ZodBoolean) => {
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
 */
export const mockInvalid = (_field: ZodBoolean) => {
  const booleans = {
    DEFAULT: NaN,
  };

  return booleans;
};
