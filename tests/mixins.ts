import * as zod from 'zod';

/**
 * Validates each entry of the given group
 *
 * @param field
 * @param group
 */
export const validateGroup = (field: zod.ZodAny, group: Record<string, unknown>) => {
  Object.entries(group).forEach(([key, value]) => {
    it(`Validates ${key}`, () => {
      const actual = field.parse(value);
      expect(actual).toEqual(value);
    });
  });
};

/**
 * Validates each entry of the given group
 *
 * @param field
 * @param group
 */
export const invalidateGroup = (field: zod.ZodAny, group: Record<string, unknown>) => {
  Object.entries(group).forEach(([key, value]) => {
    it(`Invalidates ${key}`, () => {
      const failure = () => field.parse(value);
      expect(failure).toThrowErrorMatchingSnapshot();
    });
  });
};
