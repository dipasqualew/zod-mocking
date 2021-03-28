import { DeepPartial } from '../src/types';
import { arrayFields } from './fields';
import { overrideTest, validationTests } from './mixins';

describe('array', () => {
  validationTests(arrayFields);
  overrideTest(arrayFields, [1, 2, 3] as DeepPartial<unknown>[]);
  overrideTest(arrayFields, ['a', 'b', 'c'] as DeepPartial<unknown>[]);
  overrideTest(arrayFields, [] as DeepPartial<unknown>[]);
});
