import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import Money from 'ubc-farm-money';
import { balanceDueIntSelector } from '../redux/selectors.js';

const BalanceDueRow = ({ children }) => (
	<tr className="total-row">
		<th scope="row" className="align-right" colSpan={5}>
			Balance Due (CAD)
		</th>

		<td className="align-right">
			{children}
		</td>
	</tr>
);

BalanceDueRow.propTypes = { children: PropTypes.node };

export default connect(
	state => ({
		children: Money.fromInteger(balanceDueIntSelector(state)).toString(),
	})
)(BalanceDueRow);
