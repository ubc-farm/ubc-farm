import moment from 'moment';
import { floatToCents } from '@ubc-farm/money';
import { id } from '@ubc-farm/utils';

/**
 * @param {Object} inputValues from a form
 * @returns {Array} row to be added to table
 */
export default function inputToRow(inputValues) {
	const {
		valuePerUnit,
		entryDate,
		lifeSpan,
		salvageValue,
	} = inputValues;

	return {
		id: id(),
		class: inputValues.class || 'Variable',
		product: inputValues.product,
		description: inputValues.description,
		quantity: inputValues.quantity,
		unit: inputValues.unit,
		valuePerUnit: valuePerUnit ? floatToCents(parseFloat(valuePerUnit)) : valuePerUnit,
		entryDate: entryDate ? moment(entryDate).format('DD/M/YY') : entryDate,
		lifeSpan: lifeSpan ? moment.duration(lifeSpan).toJSON() : lifeSpan,
		location: inputValues.location,
		salvageValue: salvageValue ? floatToCents(parseFloat(salvageValue)) : salvageValue,
		barcode: inputValues.barcode,
		supplier: inputValues.supplier,
		sku: inputValues.sku,
	};
}
