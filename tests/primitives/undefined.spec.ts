import { undefinedFields } from '../fields';
import { validationTests } from '../mixins';

describe('undefined', () => {
  validationTests(undefinedFields);
});
