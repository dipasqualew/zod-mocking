import * as date from '../../src/primitives/date';
import { dateFields } from '../fields';
import { invalidateGroup, validateGroup } from '../mixins';

describe('date', () => {
  dateFields.forEach(([description, field]) => {
    describe(description, () => {
      describe('validates', () => {
        const valid = date.mockValid(field);
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        const valid = date.mockInvalid(field);
        invalidateGroup(field, valid);
      });
    });
  });
});
