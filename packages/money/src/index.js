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
	constructor(thing) {
		let value = null;

		if (!(thing instanceof this.constructor)) {
			switch (typeof thing) {
				case 'number':
					thing = thing.toString(10);
					// fall through
				case 'string': {
					const onlyNumbersAndDecimals = thing.replace(/[^-0-9.]/g, '');
					const [dollars, ...centsStrings] = onlyNumbersAndDecimals.split('.');
					const centString = centsStrings.join('');

					if (!dollars && !centString) break;

					value = parseInt(dollars || 0, 10);
					value *= 100;

					let centValue = 0;
					if (centString.length > 0) {
						centValue = parseInt(centString.substr(0, 2), 10);
					}
					if (centString.length > 2) {
						const fraction = `.${centString.substr(2)}`;
						centValue += parseFloat(fraction);
					}

					if (value < 0) value -= centValue;
					else value += centValue;
					break;
				}
				case 'object': {
					if (thing === null) break;

					let val;
					try {
						val = thing.valueOf();
					} catch (err) {
						if (!(err instanceof TypeError)) throw err;
					} finally {
						if (typeof val !== 'object') break;
						value = new this.constructor(val).value;
					}
					break;
				}
				default: break;
			}
		} else {
			value = thing.value;
		}

		if (value == null) value = NaN;

		Object.defineProperty(this, 'value', { value });
	}

	/**
	 * @returns {number} the dollar value of this money
	 */
	getDollars() {
		const cents = Math.floor(this.value);
		return Math.trunc(cents / 100);
	}

	/**
	 * Returns the cents of this money.
	 * @param {number} digits - if specified, toFixed will be called on the value
	 * before determining the cents value.
	 * @returns {number} will always be between -100 and 100
	 */
	getCents(digits) {
		let value = this.value;

		if (digits !== undefined) {
			const fixed = value.toFixed(digits);
			value = parseFloat(fixed);
		}

		return value % 100;
	}

	/** Same as getDollars() */
	get dollars() { return this.getDollars(); }
	/** Same as getCents(0) */
	get cents() { return this.getCents(0); }

	/**
	 * @returns {number} the integer value of this money, stripping
	 * any fractional cents. Useful for doing money related math,
	 * as integers won't suffer from floating point problems.
	 * @example
	 * new Money('$10.99').toInteger() === 1099
	 */
	toInteger() { return Math.trunc(this.value); }

	/**
	 * @param {number} cents - an integer like that returned by Money#toInteger
	 * @returns {Money} with a value based off the provided cent amount
	 * @example
	 * Money.fromInteger(1099) == new Money('$10.99')
	 */
	static fromInteger(cents) {
		if (typeof cents !== 'number') return new this(cents);

		const intString = cents.toFixed(0);
		const value = `${intString.slice(0, -2)}.${intString.slice(-2)}`;
		return new this(value);
	}

	/**
	 * @returns {number} float representation of the money
	 * Will be NaN if the internal value is null.
	 */
	valueOf() {
		return this.value / 100;
	}

	/**
	 * Returns a formatted currency string.
	 * If value is NaN, an empty string is returned.
	 * @param {string} [locale]
	 * @param {Object} [options]
	 * @param {boolean} [options.parentheses] - wrap negative numbers
	 * in parentheses
	 * @param {string} [options.currency=USD] - currency locale to return
	 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
	 */
	toString(locale, options) {
		if (typeof locale === 'object' && /undefined|string/.test(typeof options)) {
			[locale, options] = [options, locale];
		}

		const float = this.valueOf();
		if (Number.isNaN(float)) return '';

		const opts = Object.assign({ style: 'currency', currency: 'USD' }, options);

		if (opts.parentheses && float < 0) {
			const positive = Math.abs(float);
			const str = positive.toLocaleString(locale, opts);
			return `(${str})`;
		}

		return float.toLocaleString(locale, opts);
	}

	/**
	 * @returns {string} The money as a simple string
	 */
	toJSON() {
		return this.valueOf().toString();
	}

	[Symbol.toPrimitive](hint) {
		switch (hint) {
			case 'string': return this.toString();
			case 'number': return this.valueOf();
			case 'default': default: return this.toJSON();
		}
	}
}
