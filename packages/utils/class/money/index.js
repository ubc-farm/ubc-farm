/**
 * Class used to represent money. 
 * Internally represents its value as an integer, to avoid float math issues
 * @extends Number
 * @alias module:lib/money.default
 * @typicalname money
 */
export default class Money extends Number {
	/**
	 * @param {number|number[]} money - if an array, 
	 * uses money[0] as dollars and money[1] as cents. If a float, try to convert
	 * it to an integer representing cents (multiply by 100).
	 * @param {Object} [options]
	 * @param {boolean} [options.convert=true] - if false, parse the money
	 * integer as dollars instead of cents.
	 */
	constructor(money, {convert = true} = {}) {
		let dollars, cents = 0;
		if (Array.isArray(dollars)) {
			dollars = money[0]; cents = money[1];
		}	else if ((convert && Number.isInteger(money)) 
		|| money instanceof Money) {
			super(money); 
			return;
		} else {
			const split = String(money).split('.');
			dollars = split[0]; cents = split[1];
			dollars = parseInt(dollars, 10);

			const centStr = cents;
			if (cents === undefined) cents = 0;
			else {
				cents = parseInt(centStr, 10);
				if (centStr.length === 1) cents *= 10;
			}

			const negativeDollars = 1 / dollars < 0;
			if (negativeDollars) cents *= -1;
		}

		super((dollars * 100) + cents);
	}

	/** @type {number} */
	get dollars() {
		return Math.trunc(this / 100);
	}
	/** @type {number} */
	get cents() {
		return this - (this.dollars * 100);
	}

	/**
	 * Convert the money into a string
	 * @param {boolean} [opts.dollarSign=true] if true, prepends a dollar sign 
	 * to the string
	 * @param {boolean} [opts.useMinusSign=false] normally negative amounts are
	 * wrapped in parenthesis. If useMinusSign is true, a negative sign will
	 * be prefixed to the string instead
	 * @param {string} [opts.currency=USD] currency code to use
	 * @param {string} [opts.currencyDisplay=symbol] currency style to use
	 * @param {boolean} [opts.useGrouping=true] wheter or not to 
	 * use thousands seperators
	 * @returns {string}
	 */
	toString({
		dollarSign = true, 
		useMinusSign = false, 
		currency = 'USD',
		currencyDisplay,
		useGrouping
	} = {}) {
		let value = this.toFloat(); const negative = value < 0;
		if (!useMinusSign && negative) value = Math.abs(value);

		let str;
		if (dollarSign) {
			str = value.toLocaleString(undefined, 
				{style: 'currency', currency, currencyDisplay, useGrouping});
		} else {
			str = value.toLocaleString(undefined, 
				{style: 'decimal', minimumFractionDigits: 2, useGrouping});
		}

		if (useMinusSign || !negative) return str;
		else return `(${str})`;
	}

	/**
	 * Convert the money into a float instead of an integer
	 */
	toFloat() {
		return this / 100;
	}

	/**
	 * Checks if the given money is not a number. This function avoids the 
	 * coersion used by the global isNaN function, but Number.isNaN doesn't work
	 * properly with number extensions like Money. 
	 * @returns {boolean} 
	 */
	static isNaN(money) {
		if (money === undefined) return false;
		return Number.isNaN(money.valueOf());
	}
}