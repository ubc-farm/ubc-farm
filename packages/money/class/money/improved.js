function formatMoneyString(str) {
	const onlyNumbersAndDecimals = str.replace(/[^0-9.]/g, '');

	const [dollarString, ...centStrings] = onlyNumbersAndDecimals.split('.');

	if (!dollarString && centStrings.length === 0) return null;
	
	let centString = centStrings.join('');
	if (centString.length === 1) {
		centString = centString + '0';
	} else if (centString.length === 0) {
		centString = '00';
	}

	return dollarString + '.' + centString;
}

function decimalToMoneyString(num) {
	const str = num.toString(10);
	return formatMoneyString(str);
}

/**
 * A class used to represent money. Internally the money value
 * is stored as a string, and can be converted back to either
 * an integer for math, a float for display, or a localeString for 
 * formatted display. Money instances are immutable.
 * @property {string} value - the internal value, will be null if the Money
 * is not a valid number.
 */
export default class Money {
	/**
	 * @param {Money|number|string} thing - value converted 
	 * into the Money value. If a Money instance, returns a new Money
	 * with the same value. If a number, assumes that the number is a decimal
	 * representing dollars and cents and converts it to a string.
	 * If a string, any non-digit values, except for the first . character, are
	 * stripped and the result is stored.
	 */
	constructor(thing) {
		if (thing instanceof this.constructor) {
			this.value = thing.value;
		} else {
			switch (typeof thing) {
				case 'number': 
					this.value = decimalToMoneyString(thing); break;
				case 'string': 
					this.value = formatMoneyString(thing); break;
				case 'object': 
					if (thing === null) this.value = null;
					else {
						const str = String(thing);
						const possibleValue = formatMoneyString(str);

						if (possibleValue !== null) this.value = possibleValue;
						else {
							try {
								const val = thing.valueOf();
								if (typeof val !== 'object') {
									this.value = new this.constructor(val).value;
								} else {
									this.value = null;
								}
							} catch (err) {
								if (!(err instanceof TypeError)) throw err;
							}
						}
					}
					break;
				default:
					this.value = null; break;
			}
		}

		Object.freeze(this);
	}

	/** @type {number} The dollar amount of this Money */
	get dollars() {
		if (this.value === null) return NaN;

		const pointIndex = this.value.indexOf('.');
		const dollarString = this.value.substring(0, pointIndex);
		return parseInt(dollarString);
	}

	/**
	 * @param {number} digits after decimal point, for fractional cents.
	 * @returns {number}
	 */
	getCents(digits = 0) {
		if (this.value === null) return NaN;

		const pointIndex = this.value.indexOf('.');
		const centString = this.value.substring(pointIndex);

		let multiplier = this.value.startsWith('-') ? -1 : 1;

		if (centString.length <= 2) return parseInt(centString) * multiplier;
		else if (digits > 0) {
			const centValue = parseFloat(centString);
			const shortened = centValue.toFixed(digits);
			return parseFloat(shortened) * multiplier;
		}
	}

	/** @type {number} sameas getCents(0) */
	get cents() {
		return this.getCents(0);
	}

	/**
	 * @returns {number} the money value as cents, stripping any fractional cents.
	 * Useful for doing money related math, as integers won't suffer from floating
	 * point problems.
	 * @example 
	 * new Money('$10.99').toInteger === 1099
	 */
	toInteger() {
		const {dollars, cents} = this;
		const dollarsAsCents = dollars * 100;
		return dollarsAsCents + cents;
	}

	/**
	 * @returns {number} float representation of the money
	 * Will be NaN if the internal value is null.
	 */
	valueOf() {
		return parseFloat(this.value);
	}

	/**
	 * Returns a formatted currency string
	 */
	toString(locale, {currency = 'USD', currencyDisplay, useGrouping} = {}) {
		const float = this.valueOf();
		if (float === null) return '';

		const options = {
			currency, currencyDisplay, useGrouping,
			style: 'currency'
		}

		return float.toLocaleString(locale, options);
	}
}