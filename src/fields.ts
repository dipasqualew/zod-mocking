/* eslint-disable no-use-before-define */
import { v4 as uuid4 } from 'uuid';
import * as zod from 'zod';

import {
  MAX_INTEGER,
  MIN_INTEGER,
  getRandomNumber,
  getRandomString,
  getString,
} from './utils';

/**
 * Returns the generator of valid values
 * for the given field
 *
 * @param field
 */
export const getValidGenerator = <T extends zod.ZodAny>(field: T) => {
  let generator: () => { DEFAULT: unknown } & Record<string, unknown> = () => ({ DEFAULT: null });

  if (field instanceof zod.ZodString) {
    generator = () => generateValidStrings(field);
  } else if (field instanceof zod.ZodNumber) {
    generator = () => generateValidNumbers(field);
  } else if (field instanceof zod.ZodBoolean) {
    generator = () => generateValidBooleans(field);
  } else if (field instanceof zod.ZodArray) {
    generator = () => generateValidArrays(field);
  } else if (field instanceof zod.ZodObject) {
    generator = () => generateValidObjects(field as zod.ZodObject<zod.ZodRawShape>);
  }

  return generator;
};

/**
 * Returns the generator of invalid values
 * for the given field
 *
 * @param field
 */
export const getInvalidGenerator = <T extends zod.ZodAny>(field: T) => {
  let generator: () => { DEFAULT: unknown } & Record<string, unknown> = () => ({ DEFAULT: null });

  if (field instanceof zod.ZodString) {
    generator = () => generateInvalidStrings(field);
  } else if (field instanceof zod.ZodNumber) {
    generator = () => generateInvalidNumbers(field);
  } else if (field instanceof zod.ZodBoolean) {
    generator = () => generateInvalidBooleans(field);
  } else if (field instanceof zod.ZodArray) {
    generator = () => generateInvalidArrays(field);
  } else if (field instanceof zod.ZodObject) {
    generator = () => generateInvalidObjects(field as zod.ZodObject<zod.ZodRawShape>);
  }

  return generator;
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
 * Generates valid booleans
 * from the given ZodBoolean definition
 *
 * @param _field
 */
export const generateValidBooleans = (_field: zod.ZodBoolean) => {
  const booleans = {
    DEFAULT: true,
    TRUE: true,
    FALSE: false,
  };

  return booleans;
};

/**
 * Generates invalid booleans
 * from the given ZodBoolean definition
 *
 * @param _field
 */
export const generateInvalidBooleans = (_field: zod.ZodBoolean) => {
  const booleans = {
    DEFAULT: NaN,
  };

  return booleans;
};

/**
 * Generates valid numbers
 * from the given ZodNumber definition
 *
 * @param field
 */
export const generateValidNumbers = (field: zod.ZodNumber) => {
  const min = field._def.minimum?.value || MIN_INTEGER;
  const max = field._def.maximum?.value || MAX_INTEGER;
  const integer = Boolean(field._def.isInteger);

  const numbers = {
    DEFAULT: getRandomNumber(min, max, integer),
    MIN: min,
    MAX: max,
  };

  return numbers;
};

/**
 * Generates invalid numbers
 * from the given ZodNumber definition
 *
 * @param field
 */
export const generateInvalidNumbers = (field: zod.ZodNumber) => {
  const integer = Boolean(field._def.isInteger);

  const strings: [string, string | number][] = [
    ['DEFAULT', 'not-a-number'],
  ];

  if (field._def.minimum) {
    const underMin = getRandomNumber(MIN_INTEGER, field._def.minimum.value - 1);
    strings.push(['MIN', underMin]);
  }

  if (field._def.maximum) {
    const overMax = getRandomNumber(field._def.maximum.value + 1, MAX_INTEGER);
    strings.push(['MAX', overMax]);
  }

  if (integer) {
    const float = getRandomNumber(field._def.minimum?.value || 0, field._def.maximum?.value || 20, true) + 0.1;
    strings.push(['INTEGER', float]);
  }

  return Object.fromEntries(strings) as { DEFAULT: number } & Record<string, number>;
};


/**
 * Generates an email with the given
 * constraints
 *
 * @param minLength
 * @param maxLength
 * @param domain
 */
export const getRandomEmail = (minLength: number, maxLength: number, domain = 'example.com') => {
  const normalisedMinlength = Math.max(1, minLength - domain.length - 1); // remove @ and domain length
  const normalisedMaxLength = Math.max(1, maxLength - domain.length - 1); // remove @ and domain length

  const user = getRandomString(normalisedMinlength, normalisedMaxLength);

  return `${user}@${domain}`;
};

/**
 * Generates a random URL with the given
 * constraints
 *
 * @param minLength
 * @param maxLength
 * @param domain
 */
export const getRandomUrl = (minLength: number, maxLength: number, domain = 'example.com') => {
  const normalisedMinlength = Math.max(1, minLength - domain.length - 9); // remove https://, domain length and initial slash
  const normalisedMaxLength = Math.max(1, maxLength - domain.length - 9); // remove https://, domain length and initial slash

  const path = getRandomString(normalisedMinlength, normalisedMaxLength);

  return `https://${domain}/${path}`;
};

/**
 * Generates valid strings
 * from the given ZodString definition
 *
 * @param field
 */
export const generateValidStrings = (field: zod.ZodString) => {
  const minLength = field._def.minLength?.value || 0;
  const maxLength = field._def.maxLength?.value || (minLength + 64);

  let generator = (min: number, max: number) => getRandomString(min, max);

  if (field._def.isUUID) {
    // UUIDs are fix length
    // return immediately
    return {
      DEFAULT: uuid4(),
    };
  }

  if (field._def.isEmail) {
    generator = (min: number, max: number) => getRandomEmail(min, max);
  }

  if (field._def.isURL) {
    generator = (min: number, max: number) => getRandomUrl(min, max);
  }

  const strings = {
    DEFAULT: generator(minLength, maxLength),
    MIN: generator(minLength, maxLength),
    MAX: generator(maxLength, maxLength),
  };

  return strings;
};

/**
 * Generates invalid values
 * from the given ZodString definition
 *
 * @param field
 */
export const generateInvalidStrings = (field: zod.ZodString) => {
  const minLength = field._def.minLength?.value || 0;

  const strings: [string, string | null][] = [
    ['DEFAULT', null],
  ];

  if (minLength > 0) {
    strings.push(['MIN', getString(minLength - 1)]);
  }

  if (field._def.maxLength) {
    strings.push(['MAX', getString(field._def.maxLength.value + 1)]);
  }

  return Object.fromEntries(strings) as { DEFAULT: string } & Record<string, string>;
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

  return {
    DEFAULT: Object.values(items),
  };
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

    defaultMock[key] = invalidMocks.DEFAULT as Shape[keyof Shape];
    variations[entry[0]] = invalidMocks;
  });

  const mocks: [string, unknown][] = [
    ['DEFAULT', defaultMock],
  ];

  Object.entries(variations).forEach(([fieldName, fieldVariations]) => {
    Object.entries(fieldVariations).forEach(([description, fieldValue]) => {
      const name = `${fieldName}__${description}`;
      const value = { ...valid, [fieldName]: fieldValue };

      mocks.push([name, value]);
    });
  });

  return Object.fromEntries(mocks) as { DEFAULT: unknown } & Record<string, unknown>;
};
