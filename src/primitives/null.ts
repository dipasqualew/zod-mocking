import type { ZodNull } from 'zod';

/**
 * Generates valid null mocks
 * from the given ZodNull definition
 *
 * @param _field
 */
export const mockValid = (_field: ZodNull) => {
  return {
    DEFAULT: null,
  };
};

/**
 * Generates invalid any/unknown mocks
 * from the given ZodNull definition
 *
 * @param _field
 */
export const mockInvalid = (_field: ZodNull) => {
  return {
    DEFAULT: 'DEFAULT',
    STRING: 'STRING',
    NUMBER: 1,
  };
};
