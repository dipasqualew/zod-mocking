import * as zundefined from '../../src/primitives/undefined';
import { undefinedFields } from '../fields';
import { invalidateGroup, validateGroup } from '../mixins';

describe('undefined', () => {
  undefinedFields.forEach(([description, field]) => {
    describe(description, () => {
      describe('validates', () => {
        const valid = zundefined.mockValid(field);
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        const valid = zundefined.mockInvalid(field);
        invalidateGroup(field, valid);
      });
    });
  });
});
