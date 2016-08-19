import { Money } from 'ubc-farm-utils';
import { SET_AMOUNT_PAID } from './actions.js';

export default function amountPaid(state = new Money(0), action) {
	if (action.type === SET_AMOUNT_PAID) {
		return action.amountPaid;
	}
	return state;
}
