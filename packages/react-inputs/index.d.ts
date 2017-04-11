import * as React from 'react';
import moment from 'moment';

/**
 * A field that contains an input and corresponding label.
 * An ID will be auto-generated if it isn't specified.
 */
export const Field: React.SFC<{
	children?: React.ReactElement<any>,
	label?: React.ReactElement<any> | string,
	htmlFor?: string,
	name?: string,
}>

export interface ReformedProps<Model> {
	model: Model,
	setModel(newModel: Model): void,
	setProperty(name: string, value: any): void,
	bindInput(name: string, defaultValue?: any): {
		name: string,
		value: any,
		onChange: React.ChangeEventHandler<any>,
	},
}

export function reformed():
	(WrappedComponent: React.ComponentClass<any> | React.SFC<any>)
		=> React.ComponentClass<any>;

interface DateInputProps {
	onChange?: React.ChangeEventHandler<{
		name: string,
		value: moment.Moment
	}>,
	value?: moment.Moment | number | string,
	defaultValue?: moment.Moment | number | string,
}

/**
 * Wraps date input so that value is a moment object instead of a
 * string.
 */
export const DateInput: React.SFC<DateInputProps>

/**
 * Wraps datetime-local input so that value is a moment object instead of a
 * string.
 */
export const DateTimeInput: React.SFC<DateInputProps>

/**
 * An input for money values that translates user input into a cents integer.
 */
export const MoneyInput: React.ComponentClass<{
	value: number | null | undefined;
	onChange: React.ChangeEventHandler<{
		name: string,
		value: number,
	}>
	[inputProp: string]: any;
}>
