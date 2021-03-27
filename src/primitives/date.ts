import type { ZodDate } from 'zod';

/**
 * Generates valid boolean mocks
 * from the given ZodDate definition
 *
 * @param _field
 */
export const mockValid = (_field: ZodDate) => {
  const booleans = {
    DEFAULT: new Date(),
  };

  return booleans;
};

/**
 * Generates invalid boolean mocks
 * from the given ZodDate definition
 *
 * @param _field
 */
export const mockInvalid = (_field: ZodDate) => {
  const booleans = {
    DEFAULT: 'not-a-date',
    INVALID_DATE: new Date('not-a-date'),
  };

  return booleans;
};
