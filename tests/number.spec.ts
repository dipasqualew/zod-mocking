import { generateInvalidNumbers, generateValidNumbers } from '../src/fields';
import { numberFields } from './fields';
import { invalidateGroup, validateGroup } from './mixins';

describe('number', () => {
  numberFields.forEach(([description, field]) => {
    describe(description, () => {
      describe('validates', () => {
        const valid = generateValidNumbers(field);
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        const valid = generateInvalidNumbers(field);
        invalidateGroup(field, valid);
      });
    });
  });
});
