/**
 * A class used to represent money. Internally the money value is stored
 * as cents, so most of the time it will be an integer which can be used
 * for math without floating point troubles.
 * It can also be formatted with the toString() function, utilizing
 * Number.toLocaleString().
 */
export default class Money {
	/**
	 * @param {any} thing - value converted into the Money value.
	 * If a Money instead, returns a new Money with the same value.
	 * If a number, assumes that the number is a decimal representing dollars
	 * and cents and converts it to a string.
	 * If a string, any non-digit values, except for the first . character,
	 * are stripped and the result is stored.
	 */
	constructor(thing: any)

	/**
	 * Gets the dollar value of this money
	 */
	getDollars(): number

	/**
	 * Returns the cents of this money.
	 * @param {number} [digits] - if specified, toFixed will be called on the value
	 * before determining the cents value.
	 * @returns {number} will always be between -100 and 100
	 */
	getCents(digits?: number): number

	/** Same as getDollars() */
	readonly dollars: number;
	/** Same as getCents(0) */
	readonly cents: number;

	/**
	 * Returns the integer value of this money, stripping
	 * any fractional cents. Useful for doing money related math,
	 * as integers won't suffer from floating point problems.
	 * @example
	 * new Money('$10.99').toInteger() === 1099
	 */
	toInteger(): number

	/**
	 * @param {number} cents - an integer like that returned by Money#toInteger
	 * @returns {Money} with a value based off the provided cent amount
	 * @example
	 * Money.fromInteger(1099) == new Money('$10.99')
	 */
	static fromInteger(cents: number): Money

	/**
	 * Returns float representation of the money
	 * Will be NaN if the internal value is null.
	 */
	valueOf(): number

	/**
	 * Returns a formatted currency string.
	 * If value is NaN, an empty string is returned.
	 * @param {string} [locale]
	 * @param {object} [options]
	 * @param {boolean} [options.parentheses] - wrap negative numbers
	 * in parentheses
	 * @param {string} [options.currency=USD] - currency locale to return
	 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
	 */
	toString(locale?: string, options?: Intl.NumberFormatOptions): string

	/**
	 * The money as a simple string
	 */
	toJSON(): string

	[Symbol.toPrimitive](hint: 'string' | 'default'): string;
	[Symbol.toPrimitive](hint: 'number'): number;
}

/**
 * Returns a formatted currency string.
 * If value is NaN, an empty string is returned.
 * @param {number} cents
 * @param {string} [locale]
 * @param {object} [options]
 * @param {boolean} [options.parentheses] - wrap negative numbers
 * in parentheses
 * @param {string} [options.currency=CAD] - currency locale to return
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
 */
export function centsToString(
	cents: number,
	locale?: string,
	options?: Intl.NumberFormatOptions,
): string
export function centsToString(
	cents: number,
	options?: Intl.NumberFormatOptions,
	locale?: string,
): string

interface MoneyOptions { trunc?: boolean }

/**
 * Converts a string representing money to a number representing cents
 * @param {string} str - value converted into the Money value.
 * Any non-digit values, except for the first . character,
 * are stripped and the result is stored.
 * @param {boolean} [options.trunc] - truncate fractional cents.
 * If true, an integer will be returned.
 * @returns {number}
 */
export function stringToCents(str: string, options?: MoneyOptions): number

/**
 * Converts a float representing dollars to a number representing cents
 * @param {number} float to convert into cents.
 * @param {boolean} [options.trunc] - truncate fractional cents.
 * If true, an integer will be returned.
 * @example
 * floatToCents(1.99) === 199
 * @example
 * floatToCents(8.959, { trunc: false }) === 895.9
 */
export function floatToCents(float: number, options?: MoneyOptions): number
