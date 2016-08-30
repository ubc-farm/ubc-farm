import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import Money from 'ubc-farm-money';
import { subtotalIntSelector } from '../redux/selectors.js';

const SubtotalRow = ({ children }) => (
	<tr className="total-row">
		<th scope="row" className="align-right" colSpan={4}>
			Subtotal
		</th>

		<td className="align-right">
			{children}
		</td>
	</tr>
);

SubtotalRow.propTypes = { children: PropTypes.node };

export default connect(
	state => ({
		children: Money.fromInteger(subtotalIntSelector(state)).toString(),
	})
)(SubtotalRow);
