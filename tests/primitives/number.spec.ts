import { numberFields } from '../fields';
import { overrideTest, validationTests } from '../mixins';

describe('number', () => {
  validationTests(numberFields);
  overrideTest(numberFields, 0);
  overrideTest(numberFields, 1);
  overrideTest(numberFields, -1);
  overrideTest(numberFields, Math.PI);
  overrideTest(numberFields, Infinity);
  overrideTest(numberFields, -Infinity);
});
