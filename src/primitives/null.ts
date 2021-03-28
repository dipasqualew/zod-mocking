import type { ZodNull } from 'zod';

import type { MockOptions } from '../types';

/**
 * Generates valid null mocks
 * from the given ZodNull definition
 *
 * @param _field
 * @param _options
 */
export const mockValid = (_field: ZodNull, _options: MockOptions<null>) => {
  return {
    DEFAULT: null,
  };
};

/**
 * Generates invalid any/unknown mocks
 * from the given ZodNull definition
 *
 * @param _field
 * @param _options
 */
export const mockInvalid = (_field: ZodNull, _options: MockOptions<null>) => {
  return {
    DEFAULT: 'DEFAULT',
    STRING: 'STRING',
    NUMBER: 1,
  };
};
