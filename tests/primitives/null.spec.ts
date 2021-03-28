import { nullFields } from '../fields';
import { overrideTest, seedTest, validationTests } from '../mixins';

describe('null', () => {
  validationTests(nullFields);
  overrideTest(nullFields, null);
  seedTest(nullFields);
});
