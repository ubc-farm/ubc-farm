import {connect} from 'react-redux';
import {changeData} from '../redux/actions.js'
import {dataSelector} from '../redux/selectors.js';
import StaticInput from '../small-components/input-static-placeholder.js';

const InvoiceInput = connect(
	(state, {rowKey, column}) => {
		const data = dataSelector(state);
		const value = column.getValue(data.get(rowKey)) || '';

		return { value }
	},
	(dispatch, {rowKey, column}) => ({
		onChange: e => dispatch(changeData(e.target.value, rowKey, column))
	}),
	(stateProps, dispatchProps, ownProps) => {
		let props = Object.assign({}, stateProps, dispatchProps);
		for (const key in ownProps) {
			switch (key) {
				case 'rowKey': case 'column': break;
				default: props[key] = ownProps[key];
			}
		}
		return props;
	},
	{pure: false}
)(StaticInput);

export default InvoiceInput;