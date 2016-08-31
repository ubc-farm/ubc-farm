import { createElement } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { reSortOnChange } from '../redux/actions/index.js';

const inputElement = props => createElement('input', props);

export default connect(
	undefined,
	(dispatch, { input }) => ({
		onChange(e) {
			input.onChange(e);
			dispatch(reSortOnChange(input.name));
		},
	}),
	(s, dispatchProps, ownProps) => {
		const result = Object.assign({}, ownProps, dispatchProps);
		Reflect.deleteProperty(result, 'input');
		Reflect.deleteProperty(result, 'meta');
		return result;
	}
)(inputElement);
