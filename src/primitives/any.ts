import type { ZodTypeAny, ZodUnknown } from 'zod';

import type { MockOptions } from '../types';

/**
 * Generates valid any/unknown mocks
 * from the given ZodTypeAny/ZodUnknown definition
 *
 * @param _field
 * @param _options
 */
export const mockValid = (_field: ZodTypeAny | ZodUnknown, _options: MockOptions<unknown>) => {
  return {
    DEFAULT: 1,
  };
};

/**
 * Generates invalid any/unknown mocks
 * from the given ZodTypeAny/ZodUnknown definition
 *
 * @param _field
 * @param _options
 */
export const mockInvalid = (_field: ZodTypeAny | ZodUnknown, _options: MockOptions<unknown>) => {
  // Any and Unknown are always valid
  return {};
};
