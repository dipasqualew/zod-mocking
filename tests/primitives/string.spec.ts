import { stringFields } from '../fields';
import { overrideTest, validationTests } from '../mixins';

describe('string', () => {
  validationTests(stringFields);
  overrideTest(stringFields, 'my-string');
  overrideTest(stringFields, '');
});
