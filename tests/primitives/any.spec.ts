import * as any from '../../src/primitives/any';
import { anyFields } from '../fields';
import { invalidateGroup, validateGroup } from '../mixins';

describe('any', () => {
  anyFields.forEach(([description, field]) => {
    describe(description, () => {
      describe('validates', () => {
        const valid = any.mockValid(field);
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        const valid = any.mockInvalid(field);
        invalidateGroup(field, valid);
      });
    });
  });
});
