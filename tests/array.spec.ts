import { generateInvalidArrays, generateValidArrays } from '../src/fields';
import { arrayFields } from './fields';
import { invalidateGroup, validateGroup } from './mixins';

describe('array', () => {
  arrayFields.forEach(([description, field]) => {
    describe(description, () => {
      describe('validates', () => {
        const valid = generateValidArrays(field);
        validateGroup(field, valid);
      });

      describe('invalidates', () => {
        const valid = generateInvalidArrays(field);
        invalidateGroup(field, valid);
      });
    });
  });
});
