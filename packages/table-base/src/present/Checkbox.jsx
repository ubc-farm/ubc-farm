import 'es7-object-polyfill';
import { createElement, PropTypes, Component } from 'react';
/** @jsx createElement */

/**
 * A presentational checkbox component.
 * Adds an 'indeterminate' prop to the normal checkbox properties,
 * which allows for the indeterminate value of a checkbox to be set by React.
 */
export default class Checkbox extends Component {
	componentDidMount() {	this.setIndeterminate(); }
	componentDidUpdate(prevProps) {
		if (this.props.indeterminate !== prevProps.indeterminate) {
			this.setIndeterminate();
		}
	}

	/**
	 * Indeterminate must be set manually, so get a ref to the checkbox and
	 * apply the indeterminate value if nessecary.
	 */
	setIndeterminate() { this.ref.indeterminate = this.props.indeterminate; }

	render() {
		const props = Object.entries(this.props)
			.reduce((newProps, [key, value]) => {
				/* eslint-disable no-param-reassign */
				if (key !== 'indeterminate' && key !== 'type') newProps[key] = value;
				return newProps;
			}, { type: 'checkbox' });

		return <input {...props} />;
	}
}

Checkbox.propTypes = {
	indeterminate: PropTypes.bool,
};
