import { booleanFields } from '../fields';
import { overrideTest, validationTests } from '../mixins';

describe('boolean', () => {
  validationTests(booleanFields);
  overrideTest(booleanFields, true);
  overrideTest(booleanFields, false);
});
