import { nullFields } from '../fields';
import { overrideTest, validationTests } from '../mixins';

describe('null', () => {
  validationTests(nullFields);
  overrideTest(nullFields, null);
});
