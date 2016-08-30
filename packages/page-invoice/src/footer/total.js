import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import Money from 'ubc-farm-money';
import { totalIntSelector } from '../redux/selectors.js';

const TotalRow = ({ children }) => (
	<tr className="total-row">
		<th scope="row" className="align-right" colSpan={4}>
			Total
		</th>

		<td className="align-right">
			{children}
		</td>
	</tr>
);

TotalRow.propTypes = { children: PropTypes.node };

export default connect(
	state => ({
		children: Money.fromInteger(totalIntSelector(state)).toString(),
	})
)(TotalRow);
