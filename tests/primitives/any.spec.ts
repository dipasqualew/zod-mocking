import { DeepPartial } from '../../src/types';
import { anyFields } from '../fields';
import { overrideTest, seedTest, validationTests } from '../mixins';

describe('any', () => {
  validationTests(anyFields);
  overrideTest(anyFields, 'Dante Alighieri' as DeepPartial<unknown>);
  overrideTest(anyFields, 1265 as DeepPartial<unknown>);
  seedTest(anyFields);
});
