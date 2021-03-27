import * as boolean from '../../src/primitives/boolean';
import { booleanFields } from '../fields';
import { invalidateGroup, validateGroup } from '../mixins';

describe('boolean', () => {
  booleanFields.forEach(([description, field]) => {
    describe(description, () => {
      describe('validates', () => {
        const valid = boolean.mockValid(field);
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        const valid = boolean.mockInvalid(field);
        invalidateGroup(field, valid);
      });
    });
  });
});
