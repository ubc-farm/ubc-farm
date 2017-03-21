import { createElement, Component } from 'react'; /** @jsx createElement */
import { centsToString, stringToCents } from '@ubc-farm/money';

interface MoneyInputProps {
	value: number | null;
	onChange: (e: React.ChangeEvent<any>) => void;
	[inputProp: string]: any;
}

interface MoneyInputState {
	focused: boolean;
}

/**
 * A field that contains an input and corresponding label.
 * An ID will be auto-generated if it isn't specified.
 */
export default class MoneyInput extends Component<MoneyInputProps, MoneyInputState> {
	constructor(props: MoneyInputProps) {
		super(props);

		this.state = { focused: false };
		this.handleChange = this.handleChange.bind(this);
	}

	isValid(): boolean {
		const { value } = this.props;
		return value ? !Number.isNaN(value) : true;
	}

	getValue(): string {
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

	handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		this.props.onChange({
			...e,
			target: { ...e.target, value: stringToCents(value) },
		});
	}

	render() {
		const { className, ...inputProps } = this.props;

		return (
			<input
				type="text" inputMode="number"
				{...inputProps}
				value={this.getValue()}
				onChange={this.handleChange}
				className={className /* TODO */}
			/>
		);
	}
}
