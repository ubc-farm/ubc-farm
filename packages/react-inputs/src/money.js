import { createElement, Component } from 'react';
import { centsToString, stringToCents } from '@ubc-farm/money';

/**
 * An input for money values that translates user input into a cents integer.
 */
export default class MoneyInput extends Component {
	constructor(props) {
		super(props);

		this.state = { focused: false };
		this.handleChange = this.handleChange.bind(this);
	}

	/**
	 * @returns {string}
	 */
	getValue() {
		const { value } = this.props;
		if (!value && value !== 0) return '';
		else if (!this.isValid()) {
			return '$--';
		} else if (this.state.focused) {
			return (value / 100).toString(10);
		} else {
			return centsToString(value);
		}
	}

	/**
	 * @returns {boolean}
	 */
	isValid() {
		const { value } = this.props;
		return value ? !Number.isNaN(value) : true;
	}

	handleChange(e) {
		const value = stringToCents(e.target.value);

		const event = Object.assign({}, e);
		event.target = Object.assign({}, e.target, { value });

		this.props.onChange(event);
	}

	render() {
		return createElement('input', Object.assign(
			{ type: 'text', inputMode: 'number' },
			this.props,
			{ value: this.getValue(), onChange: this.handleChange }
		));
	}
}
