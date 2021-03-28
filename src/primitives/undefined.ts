import type { ZodUndefined, ZodVoid } from 'zod';

import { MockOptions } from '../types';
/**
 * Generates valid undefined mocks
 * from the given ZodUndefined | ZodVoid definition
 *
 * @param _field
 * @param _options
 */
export const mockValid = (_field: ZodUndefined | ZodVoid, _options: MockOptions<undefined>) => {
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
 * @param _options
 */
export const mockInvalid = (_field: ZodUndefined | ZodVoid, _options: MockOptions<undefined>) => {
  return {
    DEFAULT: 'DEFAULT',
    STRING: 'STRING',
    NUMBER: 1,
  };
};
