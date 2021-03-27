import * as bigint from '../../src/primitives/bigint';
import { bigintFields } from '../fields';
import { invalidateGroup, validateGroup } from '../mixins';

describe('bigint', () => {
  bigintFields.forEach(([description, field]) => {
    describe(description, () => {
      describe('validates', () => {
        const valid = bigint.mockValid(field);
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        const valid = bigint.mockInvalid(field);
        invalidateGroup(field, valid);
      });
    });
  });
});
