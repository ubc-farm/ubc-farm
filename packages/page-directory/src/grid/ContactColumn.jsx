import { createElement } from 'react'; /** @jsx createElement */
import { Column } from 'react-virtualized';
import { mapProps, withProps, compose } from 'recompose';
import { words, last, startCase, entries } from 'lodash';
import { centsToString } from '@ubc-farm/money';
import { getDisplayedColumns } from '../redux/displayedColumns.js';

function getAddress(data) {
	if (typeof data !== 'object') return data;
	const {
		streetAddress = '',
		addressLocality = '', addressRegion = '',
		postalCode = '', addressCountry = ''
	} = data;

	return [
		streetAddress,
		`${addressLocality} ${addressRegion} ${postalCode}`,
		addressCountry
	].join('\n');
}
const addressHOC = withProps({
	cellDataGetter: ({ columnData }) => getAddress(columnData),
});
const startCaseHoc = withProps({
	cellRenderer: ({ cellData }) => startCase(cellData),
});

// Dictionary for various properties in a person.
// Will later be wrapped.
const elements = {
	name: mapProps(({ lastNameFirst }) => ({
		cellDataGetter({ columnData }) {
			const names = words(columnData);
			if (lastNameFirst) {
				return `${last(names)}, ${names.slice(0, -1).join(' ')}`;
			} else {
				return names.join(' ');
			}
		},
	})),

	role: startCaseHoc,

	email: withProps({
		cellRenderer({ cellData }) {
			if (cellData == null) return '';
			return <a href={`mailto:${cellData}`}>{cellData}</a>;
		},
	}),

	phoneNumber: withProps({
		cellDataGetter({ columnData: number }) {
			if (number.length < 10) return number;
			const areaCode = number.length > 10 ? `+${number.slice(0, -10)} ` : '';

			const last10Digits = number.slice(-10);
			let i = 0;
			const formatted = '(NNN) NNN-NNNN'.replace(/N/g, () => last10Digits[i++]);

			return areaCode + formatted;
		},
	}),

	addressMailing: addressHOC,
	addressPhysical: addressHOC,

	pay: withProps({
		cellRenderer: ({ cellData }) => centsToString(cellData),
	}),

	employmentType: startCaseHoc,
};

const ELEMENT_MAP = entries(elements).reduce((map, [dataKey, hoc]) => (
	map.set(dataKey, compose(hoc, withProps({ dataKey }))(Column))
), new Map());

export default function columnsFromState(state) {
	const columnsToRender = getDisplayedColumns(state);
	return columnsToRender.map((dataKey) => {
		if (ELEMENT_MAP.has(dataKey)) return ELEMENT_MAP.get(dataKey);
		else return withProps({ dataKey })(Column);
	});
}
