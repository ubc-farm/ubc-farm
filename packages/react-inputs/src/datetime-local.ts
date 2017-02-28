import { createElement, SFC, HTMLAttributes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { DateInputProps, handleChange } from './date';

/**
 * Wraps datetime-local input so that value is a moment object instead of a
 * string.
 */
const DateTimeInput: SFC<DateInputProps> = (props) => {
	const inputProps: HTMLAttributes<any> =
		Object.assign({ type: 'datetime-local' }, props);

	if (props.onChange) {
		inputProps.onChange = handleChange.bind(null, props.onChange);
	}

	if (props.value || props.defaultValue) {
		const val = props.value ? 'value' : 'defaultValue';
		inputProps[val] = moment(props[val]).toISOString().slice(0, -1);
	}

	return createElement('input', inputProps);
}

export default DateTimeInput;
