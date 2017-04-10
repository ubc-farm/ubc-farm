import * as React from 'react';
import moment from 'moment';

/**
 * A field that contains an input and corresponding label.
 * An ID will be auto-generated if it isn't specified.
 */
export const Field: React.SFC<{
	children?: React.ReactType;
	id?: string;
	containerProps?: object;
	labelProps?: object;
	[inputProp: string]: any;
}>

interface DateTarget {
	name: string,
	value: moment.Moment
}

interface DateInputProps {
	onChange?: React.ChangeEventHandler<DateTarget>;
	value?: moment.Moment | number;
	defaultValue?: moment.Moment | number;
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
	onChange: (e: React.ChangeEvent<any>) => void;
	[inputProp: string]: any;
}>

/**
 * Select component that lets the user select an item from a list of rows in
 * some PouchDB database. The result is returned as the _id of that row.
 */
export const RelationSelect: React.ComponentClass<{
	db: PouchDB.Database<any>;
	nameKey?: string;
	changes?: boolean;
	multi?: boolean;
}>
