import { createElement, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
	selected as selectedSelector,
	sortMapSelector,
} from '../redux/selectors.js';
/** @jsx createElement */

const renderRows = ({ fields, sortMap, component }) => {
	const fieldNames = new Map(fields.map((name, index) => [index, name]));

	const rows = [];
	for (const rowIndex of sortMap) {
		const fieldName = fieldNames.get(rowIndex);

		const row = createElement(component, {
			member: fieldName,
			index: rowIndex,
			key: rowIndex,
		});
		rows.push(row);
	}

	return <tbody>{rows}</tbody>;
};

renderRows.propTypes = {
	fields: PropTypes.any.isRequired,
	sortMap: PropTypes.arrayOf(PropTypes.number),
	component: PropTypes.func.isRequired,
};

export default connect(
	state => ({
		sortMap: sortMapSelector(state),
		selected: selectedSelector(state),
	})
)(renderRows);
