/**
 * Represents a seed value
 */
export type Seed = number | boolean | null;

export type RNG = () => number;

/**
 * Recursively applies Partial
 * to all keys in T
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};


/**
 * Returns an object that maps
 * all the keys of T to unknown
 */
export type RequiredKeys<T> = {
  [K in keyof Required<T>]: unknown;
};

/**
 * Returns an object that partially maps
 * all the keys of T to unknown
 */
export type PartialKeys<T> = {
  [K in keyof T]?: unknown
};


/**
 * Defines the shape of the options
 * that can be passed to a mock function
 */
export interface MockOptions<T> {
  override?: DeepPartial<T> | (() => DeepPartial<T>);
  seed?: Seed;
  rng?: RNG;
}

/**
 * Defines a collection of mocks
 */
export type Mocks<T> = Record<string, T>;

/**
 * Defines a mocks
 */
export type MocksGenerator = <T>() => Mocks<T>;
