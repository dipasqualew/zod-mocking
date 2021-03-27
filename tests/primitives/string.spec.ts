import * as string from '../../src/primitives/string';
import { stringFields } from '../fields';
import { invalidateGroup, validateGroup } from '../mixins';

describe('string', () => {
  stringFields.forEach(([description, field]) => {
    describe(description, () => {
      describe('validates', () => {
        const valid = string.mockValid(field);
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        const valid = string.mockInvalid(field);
        invalidateGroup(field, valid);
      });
    });
  });
});
