import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {connect} from 'react-redux';
import {Money} from '../../ubc-farm-utils/index.js';

import {Column} from '../../react-table/index.js';
import UpdateOnBlur from '../small-components/input-with-state.js';

import {changeData} from '../redux/actions.js';
import {dataSelector} from '../redux/selectors.js';

const UnitCostInput = props => (
	<UpdateOnBlur {...props} style={{maxWidth: '5em'}} />
);

UnitCostInput.propTypes = {
	value: PropTypes.string,
	placeholder: PropTypes.string,
	onBlur: PropTypes.func
}

const UnitCostInputConnected = connect(
	(state, {rowKey, column}) => {
		const data = dataSelector(state);
		
		let value = column.getValue(data.get(rowKey));
		if (value !== undefined) value = String(value);

		return { value };
	},
	(dispatch, {rowKey, column}) => ({
		onBlur(value) {
			const strippedNonNumbers = value.replace(/[^0-9\.]/g, '');
			value = new Money(strippedNonNumbers, {convert: false});

			dispatch(changeData(value, rowKey, column));
		}
	}),
	(stateProps, dispatchProps, ownProps) => {
		let props = Object.assign({}, stateProps, dispatchProps);
		for (const key in ownProps) {
			if (Object.prototype.hasOwnProperty.call(ownProps, key)) {
				switch (key) {
					case 'rowKey': case 'column': break;
					default: props[key] = ownProps[key];
				}
			}
		}
		return props;
	},
	{pure: false}
)(UnitCostInput)

UnitCostInputConnected.propTypes = {
	column: PropTypes.instanceOf(Column),
	rowKey: PropTypes.any,
	placeholder: PropTypes.string
}

export default UnitCostInputConnected;