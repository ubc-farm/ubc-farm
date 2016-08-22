import Money from 'ubc-farm-money';

/** @returns {boolean} if money is valid */
export default function validateMoney(value) {
	const money = new Money(value);

	const num = money.valueOf();
	return !Number.isNaN(num);
}
