import type { ZodLiteral } from 'zod';

import type { MockOptions } from './types';

/**
 * Generates valid literal mock
 * from the given ZodLiteral definition
 *
 * @param field
 * @param _options
 */
export const mockValid = <T>(field: ZodLiteral<T>, _options: MockOptions<T>) => {
  return {
    DEFAULT: field._def.value,
  };
};

/**
 * Generates invalid literal mocks
 * from the given ZodLiteral definition
 *
 * @param field
 * @param _options
 */
export const mockInvalid = <T>(field: ZodLiteral<T>, _options: MockOptions<T>) => {
  return {
    // This will catch all values
    // and transform it to something else
    DEFAULT: !field._def.value,
  };
};
