import type { ZodLiteral } from 'zod';

/**
 * Generates valid literal mock
 * from the given ZodLiteral definition
 *
 * @param field
 */
export const mockValid = <T>(field: ZodLiteral<T>) => {
  return {
    DEFAULT: field._def.value,
  };
};

/**
 * Generates invalid literal mocks
 * from the given ZodLiteral definition
 *
 * @param field
 */
export const mockInvalid = <T>(field: ZodLiteral<T>) => {
  return {
    // This will catch all values
    // and transform it to something else
    DEFAULT: !field._def.value,
  };
};
