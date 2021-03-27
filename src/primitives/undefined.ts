import type { ZodUndefined, ZodVoid } from 'zod';

/**
 * Generates valid undefined mocks
 * from the given ZodUndefined | ZodVoid definition
 *
 * @param _field
 */
export const mockValid = (_field: ZodUndefined | ZodVoid) => {
  return {
    DEFAULT: undefined,
    UNDEFINED: undefined,
    // eslint-disable-next-line no-void
    VOID: void 0,
  };
};

/**
 * Generates invalid undefined mocks
 * from the given ZodUndefined | ZodVoid definition
 *
 * @param _field
 */
export const mockInvalid = (_field: ZodUndefined | ZodVoid) => {
  return {
    DEFAULT: 'DEFAULT',
    STRING: 'STRING',
    NUMBER: 1,
  };
};
