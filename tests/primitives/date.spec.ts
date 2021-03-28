import { dateFields } from '../fields';
import { overrideTest, validationTests } from '../mixins';

describe('date', () => {
  validationTests(dateFields);
  overrideTest(dateFields, new Date('1265-05-01'));
});
