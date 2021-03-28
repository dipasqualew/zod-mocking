import * as zod from 'zod';

import { mock } from '../src/fields';
import { objectFields } from './fields';
import { invalidateGroup, validateGroup, validationTests } from './mixins';

const complexField = zod.object({
  root: zod.object({
    nested: zod.object({
      boolean: zod.boolean(),
      url: zod.string().url(),
      uuid: zod.string().uuid(),
      max: zod.number().max(10),
    }),
  }),
  string: zod.string().min(10).max(20),
});

describe('object', () => {
  validationTests(objectFields);

  describe('a complex example', () => {
    const { valid, invalid } = mock(complexField);

    describe('validates', () => {
      validateGroup(complexField, valid);
    });

    describe('invalidates', () => {
      invalidateGroup(complexField, invalid);
    });
  });

  describe('overrides', () => {
    const override = {
      root: {
        nested: {
          max: 3,
        },
      },
    };

    describe('overrides the key', () => {
      const { valid } = mock(complexField, { override });

      Object.entries(valid).forEach(([key, value]) => {
        it(`Overrides ${key} root.nested.max`, () => {
          expect(value.root.nested.max).toEqual(override.root.nested.max);
        });
      });
    });
  });
});
