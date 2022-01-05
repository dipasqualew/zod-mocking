import * as zod from 'zod';

export type AnyTestCase = [string, zod.ZodTypeAny | zod.ZodUnknown];
export type BigIntTestCase = [string, zod.ZodBigInt];
export type BooleanTestCase = [string, zod.ZodBoolean];
export type DateTestCase = [string, zod.ZodDate];
export type NullTestCase = [string, zod.ZodNull];
export type UndefinedTestCase = [string, zod.ZodUndefined | zod.ZodVoid];
export type NumberTestCase = [string, zod.ZodNumber];
export type StringTestCase = [string, zod.ZodString];
export type LiteralTestCase<T> = [string, zod.ZodLiteral<T>];
export type ArrayTestCase<T extends zod.ZodTypeAny = zod.ZodTypeAny> = [string, zod.ZodArray<T>];
export type ObjectTestCase<T extends zod.ZodRawShape = zod.ZodRawShape> = [string, zod.ZodObject<T>];

export const anyFields: AnyTestCase[] = [
  ['an unknown field', zod.unknown()],
  ['an any field', zod.any()],
];

export const bigintFields: BigIntTestCase[] = [
  ['a bigint field', zod.bigint()],
];

export const booleanFields: BooleanTestCase[] = [
  ['a boolean field', zod.boolean()],
];

export const dateFields: DateTestCase[] = [
  ['a date field', zod.date()],
];

export const nullFields: NullTestCase[] = [
  ['a null field', zod.null()],
];

export const numberFields: NumberTestCase[] = [
  ['a field without min or max', zod.number()],
  ['a field with min', zod.number().min(10)],
  ['a field with max', zod.number().max(10)],
  ['a field with min and max', zod.number().min(10).max(20)],
  ['a field with min === max', zod.number().min(10).max(10)],
  ['a positive field', zod.number().positive()],
  ['a negative field', zod.number().negative()],
  ['a nonpositive field', zod.number().nonpositive()],
  ['a nonnegative field', zod.number().nonnegative()],
  ['an integer field', zod.number().int()],
];

export const stringFields: StringTestCase[] = [
  ['a field without min nor max', zod.string()],
  ['a field with min', zod.string().min(10)],
  ['a field with max', zod.string().max(10)],
  ['a field with min and max', zod.string().min(10).max(20)],
  ['a field with min === max', zod.string().min(10).max(10)],
  ['an email field without min nor max', zod.string().email()],
  ['an email field with a min', zod.string().email().min(50)], // well over '@example.com'
  ['an email field with a max', zod.string().email().max(15)], // just over '@example.com'
  ['an email field with a min and a max', zod.string().email().min(5).max(15)],
  ['a URL field without min nor max', zod.string().url()],
  ['a URL field with a min', zod.string().url().min(50)], // well over 'https://example.com/'
  ['a URL field with a max', zod.string().url().max(25)], // just over 'https://example.com/'
  ['a URL field with a min and a max', zod.string().url().min(15).max(50)],
  ['a UUID field', zod.string().uuid()],
];

// Currently there is no support for Date or bigint literals in Zod.
// See: https://github.com/colinhacks/zod#literals
export const literalFields: LiteralTestCase<string | boolean | number>[] = [
  ['a string literal', zod.literal('Dante Alighieri')],
  ['a number literal', zod.literal(1265)],
  ['a boolean literal', zod.literal(true)],
];

export const undefinedFields: UndefinedTestCase[] = [
  ['an undefined field', zod.undefined()],
  ['a void field', zod.void()],
];

export const pureArrayFields: ArrayTestCase[] = [
  ...anyFields.map(([description, field]) => [`an array from ${description}`, zod.array(field)] as ArrayTestCase),
  ...bigintFields.map(([description, field]) => [`an array from ${description}`, zod.array(field)] as ArrayTestCase),
  ...booleanFields.map(([description, field]) => [`an array from ${description}`, zod.array(field)] as ArrayTestCase),
  ...nullFields.map(([description, field]) => [`an array from ${description}`, zod.array(field)] as ArrayTestCase),
  ...numberFields.map(([description, field]) => [`an array from ${description}`, zod.array(field)] as ArrayTestCase),
  ...stringFields.map(([description, field]) => [`an array from ${description}`, zod.array(field)] as ArrayTestCase),
  ...dateFields.map(([description, field]) => [`an array from ${description}`, zod.array(field)] as ArrayTestCase),
  ...undefinedFields.map(([description, field]) => [`an array from ${description}`, zod.array(field)] as ArrayTestCase),
  ...literalFields.map(([description, field]) => [`an array from ${description}`, zod.array(field)] as ArrayTestCase),
  ['an array of arrays of strings', zod.array(zod.array(zod.string()))],
];

export const pureObjectFields: ObjectTestCase[] = [
  ...anyFields.map(([description, field]) => [`an object from ${description}`, zod.object({ boolean: field })] as ObjectTestCase),
  ...bigintFields.map(([description, field]) => [`an object from ${description}`, zod.object({ boolean: field })] as ObjectTestCase),
  ...booleanFields.map(([description, field]) => [`an object from ${description}`, zod.object({ boolean: field })] as ObjectTestCase),
  ...nullFields.map(([description, field]) => [`an object from ${description}`, zod.object({ number: field })] as ObjectTestCase),
  ...numberFields.map(([description, field]) => [`an object from ${description}`, zod.object({ number: field })] as ObjectTestCase),
  ...stringFields.map(([description, field]) => [`an object from ${description}`, zod.object({ string: field })] as ObjectTestCase),
  ...dateFields.map(([description, field]) => [`an object from ${description}`, zod.object({ string: field })] as ObjectTestCase),
  ...undefinedFields.map(([description, field]) => [`an object from ${description}`, zod.object({ string: field })] as ObjectTestCase),
  ...literalFields.map(([description, field]) => [`an object from ${description}`, zod.object({ string: field })] as ObjectTestCase),
  ['an object with boolean, number and string', zod.object({ boolean: booleanFields[0][1], number: numberFields[0][1], string: stringFields[0][1] })],
  ['an object with boolean, number and string with constraints', zod.object({ boolean: booleanFields[0][1], number: numberFields[1][1], string: stringFields[1][1] })],
  ['an object with an object', zod.object({ obj: zod.object({ boolean: booleanFields[0][1], number: numberFields[0][1] }), string: stringFields[0][1] })],
  ['an object with an object with constraints', zod.object({ obj: zod.object({ boolean: booleanFields[0][1], number: numberFields[1][1] }), string: stringFields[1][1] })],
];

export const arrayFields: ArrayTestCase[] = [
  ...pureArrayFields,
  ...pureObjectFields.map(([description, field]) => [`an array from ${description}`, zod.array(field)] as ArrayTestCase),
];

export const objectFields: ObjectTestCase[] = [
  ...pureObjectFields,
  ...pureArrayFields.map(([description, field]) => [`an object from ${description}`, zod.object({ string: field })] as ObjectTestCase),
];
