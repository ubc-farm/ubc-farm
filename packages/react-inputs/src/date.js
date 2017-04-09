import { createElement } from 'react';
import moment from 'moment';

export function handleChange(onChange, e) {
	const event = Object.assign({}, e);
	const target = Object.assign({}, e.currentTarget, {
		value: moment(e.currentTarget.value)
	});

	event.target = target;
	event.currentTarget = target;

	onChange(event);
}

/**
 * Wraps date input so that value is a moment object instead of a
 * string.
 */
export default function DateInput(props) {
	const inputProps = Object.assign({ type: 'date' }, props);

	if (props.onChange) {
		inputProps.onChange = handleChange.bind(null, props.onChange);
	}

	if (props.value || props.defaultValue) {
		const val = props.value ? 'value' : 'defaultValue';
		if (props[val] == null) inputProps[val] = '';
		else inputProps[val] = moment(props[val]).format('Y-MM-DD');
	}

	return createElement('input', inputProps);
}
