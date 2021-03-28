import { bigintFields } from '../fields';
import { overrideTest, seedTest, validationTests } from '../mixins';

describe('bigint', () => {
  validationTests(bigintFields);
  overrideTest(bigintFields, BigInt(100));
  overrideTest(bigintFields, BigInt(-100));
  seedTest(bigintFields);
});
