import * as React from 'react';
import moment from 'moment';

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
	value?: moment.Moment;
	defaultValue?: moment.Moment;
}

export const DateInput: React.SFC<DateInputProps>
export const DateTimeInput: React.SFC<DateInputProps>

export const RelationSelect: React.ComponentClass<{
	db: PouchDB.Database<any>;
	nameKey?: string;
	changes?: boolean;
	multi?: boolean;
}>
