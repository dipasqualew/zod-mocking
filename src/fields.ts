/* eslint-disable no-use-before-define */
import * as zod from 'zod';

import * as literal from './literal';
import * as any from './primitives/any';
import * as bigint from './primitives/bigint';
import * as boolean from './primitives/boolean';
import * as date from './primitives/date';
import * as znull from './primitives/null';
import * as number from './primitives/number';
import * as string from './primitives/string';
import * as zundefined from './primitives/undefined';

/**
 * Mock generator function
 */
export type MockGenerator = () => { DEFAULT?: unknown } & Record<string, unknown>;

/**
 * Returns the generator of valid values
 * for the given field
 *
 * @param field
 */
export const getValidGenerator = <T extends zod.ZodAny>(field: T): MockGenerator => {
  if (field instanceof zod.ZodString) {
    return () => string.mockValid(field);
  }
  if (field instanceof zod.ZodNumber) {
    return () => number.mockValid(field);
  }

  if (field instanceof zod.ZodBoolean) {
    return () => boolean.mockValid(field);
  }

  if (field instanceof zod.ZodArray) {
    return () => generateValidArrays(field);
  }

  if (field instanceof zod.ZodObject) {
    return () => generateValidObjects(field as zod.ZodObject<zod.ZodRawShape>);
  }

  if (field instanceof zod.ZodDate) {
    return () => date.mockValid(field);
  }

  if (field instanceof zod.ZodBigInt) {
    return () => bigint.mockValid(field);
  }

  if (field instanceof zod.ZodLiteral) {
    return () => literal.mockValid(field);
  }

  if (field instanceof zod.ZodNull) {
    return () => znull.mockValid(field);
  }

  if (field instanceof zod.ZodUndefined || field instanceof zod.ZodVoid) {
    return () => zundefined.mockValid(field);
  }

  return () => any.mockValid(field);
};

/**
 * Returns the generator of invalid values
 * for the given field
 *
 * @param field
 */
export const getInvalidGenerator = <T extends zod.ZodAny>(field: T): MockGenerator => {
  if (field instanceof zod.ZodString) {
    return () => string.mockInvalid(field);
  }

  if (field instanceof zod.ZodNumber) {
    return () => number.mockInvalid(field);
  }

  if (field instanceof zod.ZodBoolean) {
    return () => boolean.mockInvalid(field);
  }

  if (field instanceof zod.ZodArray) {
    return () => generateInvalidArrays(field);
  }

  if (field instanceof zod.ZodObject) {
    return () => generateInvalidObjects(field as zod.ZodObject<zod.ZodRawShape>);
  }

  if (field instanceof zod.ZodDate) {
    return () => date.mockInvalid(field);
  }

  if (field instanceof zod.ZodLiteral) {
    return () => literal.mockInvalid(field);
  }

  if (field instanceof zod.ZodBigInt) {
    return () => bigint.mockInvalid(field);
  }

  if (field instanceof zod.ZodNull) {
    return () => znull.mockInvalid(field);
  }

  if (field instanceof zod.ZodUndefined || field instanceof zod.ZodVoid) {
    return () => zundefined.mockInvalid(field);
  }

  return () => any.mockInvalid(field);
};

/**
 * Returns the valid mocks
 * for the given field
 *
 * @param field
 */
export const mockValid = <T extends zod.ZodAny>(field: T) => {
  const generator = getValidGenerator(field);

  return generator();
};

/**
 * Returns the invalid mocks
 * for the given field
 *
 * @param field
 */
export const mockInvalid = <T extends zod.ZodAny>(field: T) => {
  const generator = getInvalidGenerator(field);

  return generator();
};

/**
 * Returns all mocks
 * for the given field
 *
 * @param field
 */
export const mock = <T extends zod.ZodAny>(field: T) => {
  return {
    valid: mockValid(field),
    invalid: mockInvalid(field),
  };
};

/**
 * Generates valid arrays
 * from the given ZodArray definition
 *
 * @param field
 */
export const generateValidArrays = <T extends zod.ZodAny>(field: zod.ZodArray<T>) => {
  const generator = getValidGenerator(field._def.type);
  const items = generator();

  return {
    DEFAULT: Object.values(items),
  };
};

/**
 * Generates invalid arrays
 * from the given ZodArray definition
 *
 * @param field
 */
export const generateInvalidArrays = <T extends zod.ZodAny>(field: zod.ZodArray<T>) => {
  const generator = getInvalidGenerator(field._def.type);
  const items = generator();

  const values = Object.values(items);

  if (values.length) {
    return {
      DEFAULT: values,
    };
  }

  return {};
};

/**
 * Generates valid objects
 * from the given ZodObject definition
 *
 * @param field
 */
export const generateValidObjects = <T extends zod.ZodRawShape>(field: zod.ZodObject<T>) => {
  type Shape = zod.infer<typeof field>;

  const defaultMock: Partial<Shape> = {};
  const variations: Record<string, Record<string, unknown>> = {};

  Object.entries(field.shape).forEach((entry) => {
    const key = entry[0] as keyof Shape;
    const def = entry[1] as Shape[keyof Shape];
    const generator = getValidGenerator(def);
    const validMocks = generator();

    defaultMock[key] = validMocks.DEFAULT as Shape[keyof Shape];
    variations[entry[0]] = validMocks;
  });

  const mocks = [
    ['DEFAULT', defaultMock],
  ];

  Object.entries(variations).forEach((variation) => {
    Object.entries(variation[1]).forEach((entry) => {
      const name = `${variation[0]}__${entry[0]}`;
      const value = { ...defaultMock, [variation[0]]: entry[1] };

      mocks.push([name, value]);
    });
  });

  return Object.fromEntries(mocks) as { DEFAULT: Shape } & Record<string, Shape>;
};

/**
 * Generates valid objects
 * from the given ZodObject definition
 *
 * @param field
 */
export const generateInvalidObjects = <T extends zod.ZodRawShape>(field: zod.ZodObject<T>) => {
  type Shape = zod.infer<typeof field>;

  const valid = generateValidObjects(field).DEFAULT;

  const defaultMock: Partial<Shape> = {};
  const variations: Record<string, Record<string, unknown>> = {};

  Object.entries(field.shape).forEach((entry) => {
    const key = entry[0] as keyof Shape;
    const def = entry[1] as Shape[keyof Shape];
    const generator = getInvalidGenerator(def);
    const invalidMocks = generator();

    if ('DEFAULT' in invalidMocks) {
      defaultMock[key] = invalidMocks.DEFAULT as Shape[keyof Shape];
      variations[entry[0]] = invalidMocks;
    }
  });

  const mocks: [string, unknown][] = [];

  if (Object.keys(defaultMock).length) {
    mocks.push(['DEFAULT', defaultMock]);
  }

  Object.entries(variations).forEach(([fieldName, fieldVariations]) => {
    Object.entries(fieldVariations).forEach(([description, fieldValue]) => {
      const name = `${fieldName}__${description}`;
      const value = { ...valid, [fieldName]: fieldValue };

      mocks.push([name, value]);
    });
  });

  return Object.fromEntries(mocks) as { DEFAULT: unknown } & Record<string, unknown>;
};
