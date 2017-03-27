import { autofill } from 'redux-form';
import { datalistValues } from '../selectors.js';

export default function autofillFromItem(parent, value) {
	return (dispatch, getState) => {
		const trimmed = value.trim().toLowerCase();
		const equipment = datalistValues(getState());

		const corresponding = equipment.find(item => (
			item.name.toLowerCase() === trimmed
		));

		if (corresponding !== undefined) {
			dispatch(autofill('invoice',
				`${parent}.description`, corresponding.description));
			dispatch(autofill('invoice',
				`${parent}.unitCost`, corresponding.salvageValue));
			dispatch(autofill('invoice',
				`${parent}.quantity`, corresponding.quantity));
		}
	};
}
