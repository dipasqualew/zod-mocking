import { getUUID, mulberry32 } from '../src/utils';

describe('utils', () => {
  describe('mulberry32', () => {
    it('returns random numbers', () => {
      const rng = mulberry32(1);
      const length = 10000;
      const arr = Array.from({ length }).map(() => rng());
      const set = new Set(arr);
      expect(set.size).toEqual(length);
    });

    it('instances from the same seed return the same sequence', () => {
      const rng1 = mulberry32(1);
      const rng2 = mulberry32(1);

      const length = 500;

      const set = new Set();

      for (let i = 0; i < length; i += 1) {
        set.add(rng1());
        set.add(rng2());

        expect(set.size).toEqual(i + 1);
      }
    });

    it('instances from different seeds return the different sequences', () => {
      const rng1 = mulberry32(1);
      const rng2 = mulberry32(2);

      const length = 500;

      const set = new Set();

      for (let i = 0; i < length; i += 1) {
        set.add(rng1());
        set.add(rng2());

        expect(set.size).toEqual((i + 1) * 2);
      }
    });
  });

  describe('getUUID', () => {
    describe('without a seed', () => {
      it('returns a random UUID', () => {
        const length = 500;
        const arr = Array.from({ length }).map(() => getUUID());
        const set = new Set(arr);

        expect(set.size).toEqual(length);
      });
    });

    describe('with a seed', () => {
      it('returns a sequence of deterministic UUIDs', () => {
        const rng = mulberry32(1);
        const uuids = [
          getUUID(rng),
          getUUID(rng),
          getUUID(rng),
        ];

        expect(uuids).toMatchSnapshot();
      });
    });
  });
});
