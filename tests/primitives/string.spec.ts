import * as zod from 'zod';

import { mock } from '../../src/fields';
import { stringFields } from '../fields';
import {
  invalidateGroup, overrideTest, seedTest, validationTests,
} from '../mixins';

describe('string', () => {
  validationTests(stringFields);
  overrideTest(stringFields, 'my-string');
  overrideTest(stringFields, '');
  seedTest(stringFields);

  describe('effects', () => {
    const effect = zod.string().transform((value) => `${value} by Dante Alighieri`).transform((value) => value.toUpperCase());
    const { valid, invalid } = mock(effect);

    // They are still invalid
    invalidateGroup(effect, invalid);

    describe('casts the valid values', () => {
      Object.entries(valid).forEach(([key, value]) => {
        it(key, () => {
          expect(value.endsWith(' BY DANTE ALIGHIERI')).toEqual(true);
        });
      });
    });
  });
});
