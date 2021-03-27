import * as number from '../../src/primitives/number';
import { numberFields } from '../fields';
import { invalidateGroup, validateGroup } from '../mixins';

describe('number', () => {
  numberFields.forEach(([description, field]) => {
    describe(description, () => {
      describe('validates', () => {
        const valid = number.mockValid(field);
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        const valid = number.mockInvalid(field);
        invalidateGroup(field, valid);
      });
    });
  });
});
