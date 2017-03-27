import { createElement, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
	selected as selectedSelector,
	sortMapSelector,
} from '../redux/selectors.js';
/** @jsx createElement */

const renderRows = ({ fields, component }) => (
	<tbody>
		{fields.map((name, index) => createElement(component, {
			member: name,
			index,
			key: index,
		}))}
	</tbody>
);

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
