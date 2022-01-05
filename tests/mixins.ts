import superjson from 'superjson';
import * as zod from 'zod';

import { mock } from '../src/fields';
import { DeepPartial } from '../src/types';

/**
 * Validates each entry of the given group
 *
 * @param field
 * @param group
 */
export const validateGroup = (field: zod.ZodTypeAny, group: Record<string, unknown>) => {
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
export const invalidateGroup = (field: zod.ZodTypeAny, group: Record<string, unknown>) => {
  Object.entries(group).forEach(([key, value]) => {
    it(`Invalidates ${key}`, () => {
      const failure = () => field.parse(value);
      expect(failure).toThrowErrorMatchingSnapshot();
    });
  });
};

/**
 * Validates fields
 *
 * @param instances
 */
export const validationTests = (instances: [string, zod.ZodTypeAny][]) => {
  instances.forEach(([description, field]) => {
    describe(description, () => {
      const { valid, invalid } = mock(field);

      describe('validates', () => {
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        invalidateGroup(field, invalid);
      });
    });
  });
};

/**
 * Tests overrides
 *
 * @param instances
 * @param override
 */
export const overrideTest = <T extends zod.ZodTypeAny>(instances: [string, T][], override: DeepPartial<zod.infer<T>>) => {
  instances.forEach(([description, field]) => {
    describe(description, () => {
      describe(`overrides ${description}`, () => {
        describe('as value', () => {
          const { valid, invalid } = mock(field, { override });

          Object.entries(valid).forEach(([name, value]) => {
            it(name, () => {
              expect(value).toEqual(override);
            });
          });

          Object.entries(invalid).forEach(([name, value]) => {
            it(name, () => {
              expect(value).toEqual(override);
            });
          });
        });

        describe('as function', () => {
          const { valid, invalid } = mock(field, { override: () => override });

          Object.entries(valid).forEach(([name, value]) => {
            it(name, () => {
              expect(value).toEqual(override);
            });
          });

          Object.entries(invalid).forEach(([name, value]) => {
            it(name, () => {
              expect(value).toEqual(override);
            });
          });
        });
      });
    });
  });
};

/**
 * Tests overrides
 *
 * @param instances
 */
export const seedTest = <T extends zod.ZodTypeAny>(instances: [string, T][]) => {
  instances.forEach(([description, field]) => {
    describe(description, () => {
      describe('generates deterministic values', () => {
        const batch1 = mock(field, { seed: 99 });
        const batch2 = mock(field, { seed: 99 });

        it('the valid mocks', () => {
          // needs to be serialized because of jest same ref problems
          // needs superjson because of bigint
          expect(superjson.stringify(batch1.valid)).toEqual(superjson.stringify(batch2.valid));
        });

        it('the invalid mocks', () => {
          // needs to be serialized because of jest same ref problems
          // needs superjson because of bigint
          expect(superjson.stringify(batch1.invalid)).toEqual(superjson.stringify(batch2.invalid));
        });
      });
    });
  });
};
