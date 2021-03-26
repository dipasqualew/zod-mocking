import * as zod from 'zod';

import { generateInvalidObjects, generateValidObjects } from '../src/fields';
import { objectFields } from './fields';
import { invalidateGroup, validateGroup } from './mixins';

describe('object', () => {
  objectFields.forEach(([description, field]) => {
    describe(description, () => {
      describe('validates', () => {
        const valid = generateValidObjects(field);
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        const invalid = generateInvalidObjects(field);
        invalidateGroup(field, invalid);
      });
    });
  });

  describe('a complex example', () => {
    const field = zod.object({
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

    describe('validates', () => {
      const valid = generateValidObjects(field);
      validateGroup(field, valid);
    });

    describe('invalidates', () => {
      const invalid = generateInvalidObjects(field);
      invalidateGroup(field, invalid);
    });
  });
});
