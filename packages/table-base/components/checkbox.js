import { createElement as h, PropTypes, PureComponent } from 'react';
/** @jsx h */
import { omit } from 'ubc-farm-utils/index.js';

/**
 * A checkbox component. Adds a 'indeterminate' prop, which allows for the
 * indeterminate value of a checkbox to be set.
 */
export default class Checkbox extends PureComponent {
	static get propTypes() {
		return {
			indeterminate: PropTypes.bool,
			checked: PropTypes.bool,
			defaultChecked: PropTypes.bool,
			onChange: PropTypes.func,
			readOnly: PropTypes.bool,
		};
	}

	componentDidMount() {
		this.handleIndeterminate(this.props.indeterminate);
	}

	componentDidUpdate(prevProps) {
		const { indeterminate } = this.props;
		if (indeterminate !== prevProps.indeterminate) {
			this.handleIndeterminate(indeterminate);
		}
	}

	/**
	 * Indeterminate must be set manually, so get a ref to the checkbox and
	 * apply the indeterminate value if nessecary.
	 */
	handleIndeterminate(flag) {
		this.ref.indeterminate = flag;
	}

	render() {
		return (
			<input
				{...omit(this.props, 'indeterminate')}
				type="checkbox"
				ref={checkbox => { this.ref = checkbox; }}
			/>
		);
	}
}
