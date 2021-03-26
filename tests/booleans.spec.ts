import { generateInvalidBooleans, generateValidBooleans } from '../src/fields';
import { booleanFields } from './fields';
import { invalidateGroup, validateGroup } from './mixins';

describe('boolean', () => {
  booleanFields.forEach(([description, field]) => {
    describe(description, () => {
      describe('validates', () => {
        const valid = generateValidBooleans(field);
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        const valid = generateInvalidBooleans(field);
        invalidateGroup(field, valid);
      });
    });
  });
});
