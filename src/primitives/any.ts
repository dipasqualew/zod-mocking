import type { ZodAny, ZodUnknown } from 'zod';

/**
 * Generates valid any/unknown mocks
 * from the given ZodAny/ZodUnknown definition
 *
 * @param _field
 */
export const mockValid = (_field: ZodAny | ZodUnknown) => {
  return {
    DEFAULT: 1,
  };
};

/**
 * Generates invalid any/unknown mocks
 * from the given ZodAny/ZodUnknown definition
 *
 * @param _field
 */
export const mockInvalid = (_field: ZodAny | ZodUnknown) => {
  // Any and Unknown are always valid
  return {};
};
