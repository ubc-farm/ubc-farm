import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {connect} from 'react-redux';
import {Cell} from '../../react-table/index.js';

import {
	amountPaidSelector,
	totalColumnSelector
} from '../redux/selectors.js';
import {setAmountPaid} from '../redux/actions.js';
import UpdateOnBlur from '../small-components/input-with-state.js';

const AmountPaidCell = ({value, onBlur, cellProps}) => (
	<Cell {...cellProps}>
		<UpdateOnBlur value={value} onBlur={onBlur} />
	</Cell>
)

AmountPaidCell.propTypes = {
	value: PropTypes.string,
	onBlur: PropTypes.func,
	cellProps: PropTypes.object
}

export default connect(
	state => ({
		value: amountPaidSelector(state).toString(),
		cellProps: totalColumnSelector(state).toJSON()
	}),
	dispatch => ({
		onBlur(value) {dispatch(setAmountPaid(value))}
	})
)(AmountPaidCell)