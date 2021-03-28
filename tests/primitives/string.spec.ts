import { stringFields } from '../fields';
import { overrideTest, seedTest, validationTests } from '../mixins';

describe('string', () => {
  validationTests(stringFields);
  overrideTest(stringFields, 'my-string');
  overrideTest(stringFields, '');
  seedTest(stringFields);
});
