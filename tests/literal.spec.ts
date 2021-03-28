import { literalFields } from './fields';
import { overrideTest, validationTests } from './mixins';

describe('literal', () => {
  validationTests(literalFields);
  overrideTest(literalFields, 'z');
  overrideTest(literalFields, 999);
  overrideTest(literalFields, true);
});
