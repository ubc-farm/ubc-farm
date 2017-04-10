import { createElement, Component } from 'react';
import { centsToString, stringToCents } from '@ubc-farm/money';

/**
 * An input for money values that translates user input into a cents integer.
 */
export default class MoneyInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			focused: false,
			textValue: '',
		};

		this.handleChange = e => this.setState({ textValue: e.target.value });
		this.handleFocus = () => this.setState({ focused: true });
		this.handleBlur = this.handleBlur.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setState({ textValue: centsToString(nextProps.value) })
		}
	}

	getBlurText() {
		const cents = this.props.value;
		if (cents == null) return '';
		if (Number.isNaN(cents)) return `--`;
		else return centsToString(cents);
	}

	handleBlur(e) {
		this.setState({ focused: false });

		const target = {
			name: e.currentTarget.name,
			value: this.state.textValue,
		}

		const event = Object.assign({}, e, { target, currentTarget: target });
		event.target.value = stringToCents(this.state.textValue);
		this.props.onChange(event);
	}

	render() {
		const { value } = this.props;
		const { focused, textValue } = this.state;

		const text = focused ? textValue : this.getBlurText();

		let invalid = false;
		if (value != null) {
			invalid = Number.isNaN(value);
		}

		const classes = [this.props.className, invalid ? 'is-danger' : ''];
		const className = classes.filter(Boolean).join(' ');

		return createElement('input', Object.assign(
			{ type: 'text', inputMode: 'number' },
			this.props,
			{
				value: text,
				className,
				onChange: this.handleChange,
				onFocus: this.handleFocus,
				onBlur: this.handleBlur,
			}
		));
	}
}
