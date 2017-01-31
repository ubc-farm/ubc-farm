import moment from 'moment';
import { snakeCase } from 'lodash-es';
import { id } from '@ubc-farm/utils';
import { floatToCents } from '@ubc-farm/money';
import itemAsset from './itemURI.js';

export const clearEquipmentOnlyKeys = Object.freeze({
	quantity: undefined,
	unit: undefined,
	entryDate: undefined,
	location: undefined,
});

export default function transformInputToRow(input) {
	const {
		valuePerUnit,
		entryDate,
		lifeSpan,
		salvageValue,
	} = input;

	return Object.assign(
		{ _id: itemAsset({ id: id(''), product: snakeCase(input.product) }) },
		input,
		{
			class: input.class || 'Variable',
			valuePerUnit: valuePerUnit
				? floatToCents(parseFloat(valuePerUnit))
				: valuePerUnit,
			salvageValue: salvageValue
				? floatToCents(parseFloat(salvageValue))
				: salvageValue,
			entryDate: entryDate ? moment(entryDate).format('DD/M/YY') : entryDate,
			lifeSpan: lifeSpan ? moment.duration(lifeSpan).toJSON() : lifeSpan,
		},
	);
}
