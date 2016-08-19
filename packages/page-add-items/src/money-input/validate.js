import Money from 'ubc-farm-utils/class/money/improved.js';

/** @returns {boolean} if money is valid */
export default function validateMoney(value) {
	const money = new Money(value);

	const num = money.valueOf();
	return !Number.isNaN(num);
}
