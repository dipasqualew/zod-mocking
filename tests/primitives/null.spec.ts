import * as znull from '../../src/primitives/null';
import { nullFields } from '../fields';
import { invalidateGroup, validateGroup } from '../mixins';

describe('null', () => {
  nullFields.forEach(([description, field]) => {
    describe(description, () => {
      describe('validates', () => {
        const valid = znull.mockValid(field);
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        const valid = znull.mockInvalid(field);
        invalidateGroup(field, valid);
      });
    });
  });
});
