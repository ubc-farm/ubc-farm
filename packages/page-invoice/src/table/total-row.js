import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { connect } from 'react-redux';
import { classlist as cx } from 'ubc-farm-utils';

import {
	totalColumnSelector,
	calculatePositionOffset,
} from '../redux/selectors.js';

const BaseTotalRow = ({ dark, leftPad, rightPad, label, cell, bold }) => (
	<tr className={cx('total-row', { 'total-row-dark': dark })}>
		<th scope="row" className="align-right" colSpan={leftPad}>
			{bold ? <strong>{label}</strong> : label}
		</th>
		{cell}

		{rightPad ? <td colSpan="0" /> : null}
	</tr>
);

BaseTotalRow.propTypes = {
	dark: PropTypes.bool,
	bold: PropTypes.bool,
	leftPad: PropTypes.number,
	rightPad: PropTypes.number,
	label: PropTypes.node,
	cell: PropTypes.node,
};

const ConnectedTotalRow = connect(
	(state, { selector }) => {
		const { leftPad, rightPad } = calculatePositionOffset(state);
		const props = { leftPad, rightPad };

		if (selector) {
			const totalColumn = totalColumnSelector(state);
			const value = selector(state);
			props.cell = totalColumn.toElement(value);
		}

		return props;
	}
)(BaseTotalRow);

ConnectedTotalRow.propTypes = {
	selector: PropTypes.func,
	label: PropTypes.node,
	dark: PropTypes.bool,
};

export default ConnectedTotalRow;
