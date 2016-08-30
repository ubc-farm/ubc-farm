import { createElement, cloneElement, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
	selected as selectedSelector,
	sortMapSelector,
} from '../redux/selectors.js';
/** @jsx createElement */

const renderRows = ({ fields, sortMap, children }) => {
	const fieldNames = new Map(fields.map((name, index) => [index, name]));

	const rows = [];
	for (const rowIndex of sortMap.values()) {
		const fieldName = fieldNames.get(rowIndex);

		const row = cloneElement(children, {
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
	sortMap: PropTypes.instanceOf(Map),
	children: PropTypes.element.isRequired,
};

export default connect(
	state => ({
		sortMap: sortMapSelector(state),
		selected: selectedSelector(state),
	})
)(renderRows);
