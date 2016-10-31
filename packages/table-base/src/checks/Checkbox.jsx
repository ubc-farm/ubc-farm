import 'es7-object-polyfill';
import { createElement, PropTypes, PureComponent } from 'react';
/** @jsx createElement */

/**
 * A checkbox component. Adds a 'indeterminate' prop, which allows for the
 * indeterminate value of a checkbox to be set.
 */
export default class Checkbox extends PureComponent {
	static get propTypes() {
		return { indeterminate: PropTypes.bool };
	}

	componentDidMount() {
		this.handleIndeterminate();
	}

	componentDidUpdate(prevProps) {
		if (this.props.indeterminate !== prevProps.indeterminate) {
			this.handleIndeterminate();
		}
	}

	/**
	 * Indeterminate must be set manually, so get a ref to the checkbox and
	 * apply the indeterminate value if nessecary.
	 */
	handleIndeterminate() {
		this.ref.indeterminate = this.props.indeterminate;
	}

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
