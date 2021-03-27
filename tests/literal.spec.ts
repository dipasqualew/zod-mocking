import { mockInvalid, mockValid } from '../src/literal';
import { literalFields } from './fields';
import { invalidateGroup, validateGroup } from './mixins';

describe('literal', () => {
  literalFields.forEach(([description, field]) => {
    describe(description, () => {
      describe('validates', () => {
        const valid = mockValid(field);
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        const valid = mockInvalid(field);
        invalidateGroup(field, valid);
      });
    });
  });
});
