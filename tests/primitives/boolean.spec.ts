import { booleanFields } from '../fields';
import { overrideTest, seedTest, validationTests } from '../mixins';

describe('boolean', () => {
  validationTests(booleanFields);
  overrideTest(booleanFields, true);
  overrideTest(booleanFields, false);
  seedTest(booleanFields);
});
