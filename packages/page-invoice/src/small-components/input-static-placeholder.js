import { createElement as h, PureComponent, PropTypes } from 'react';
/** @jsx h */

const stop = e => e.stopPropagation();

/**
 * Used for inputs inside a table. The placeholder will not
 * update from its initial prop, allowing for randomly-generated placeholders
 * that don't regenerate each re-render.
 */
export default class StaticPlaceholderInput extends PureComponent {
	static get propTypes() {
		return {
			placeholder: PropTypes.string,
		};
	}

	constructor(props) {
		super(props);

		this.state = { placeholder: this.props.placeholder };
	}

	render() {
		return (
			<input
				type="text" onClick={stop}
				{...this.props}
				placeholder={this.state.placeholder}
			/>
		);
	}
}
