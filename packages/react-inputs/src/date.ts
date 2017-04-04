import {
	createElement,
	SFC, HTMLAttributes,
	ChangeEvent, ChangeEventHandler,
} from 'react'; /** @jsx createElement */
import moment from 'moment';

interface DateTarget extends EventTarget {
	name: string,
	value: moment.Moment
}

export interface DateInputProps {
	onChange?: ChangeEventHandler<DateTarget>;
	value?: moment.Moment | number;
	defaultValue?: moment.Moment | number;
}

export function handleChange(
	onChange: ChangeEventHandler<DateTarget>,
	e: ChangeEvent<DateTarget>,
) {
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
const DateInput: SFC<DateInputProps> = (props) => {
	const inputProps: HTMLAttributes<any> = Object.assign({ type: 'date' }, props);

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

export default DateInput;
