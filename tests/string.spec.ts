import { generateInvalidStrings, generateValidStrings } from '../src/fields';
import { stringFields } from './fields';
import { invalidateGroup, validateGroup } from './mixins';

describe('strings', () => {
  stringFields.forEach(([description, field]) => {
    describe(description, () => {
      describe('validates', () => {
        const valid = generateValidStrings(field);
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        const valid = generateInvalidStrings(field);
        invalidateGroup(field, valid);
      });
    });
  });
});
