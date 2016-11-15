import moment from 'moment';
import { floatToCents } from '@ubc-farm/money';

/**
 * @param {Object} inputValues from a form
 * @returns {Array} row to be added to table
 */
export default function inputToRow(inputValues) {
	return {
		id: null,
		class: inputValues.class,
		product: inputValues.product,
		description: inputValues.description,
		quantity: inputValues.quantity,
		unit: inputValues.unit,
		valuePerUnit: floatToCents(inputValues.valuePerUnit),
		entryDate: moment(inputValues.entryDate).format('DD/M/YY'),
		lifeSpan: moment.duration(inputValues.lifeSpan).toJSON(),
		location: inputValues.location,
		salvageValue: floatToCents(inputValues.salvageValue),
		barcode: inputValues.barcode,
		supplier: inputValues.supplier,
		sku: inputValues.sku,
	};
}
