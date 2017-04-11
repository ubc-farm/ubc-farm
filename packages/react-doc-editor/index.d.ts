import * as React from 'react';
import { ReformedProps } from '@ubc-farm/react-inputs';

export const Notification: React.SFC<{
	status?: '' | 'primary' | 'info' | 'success' | 'warning' | 'danger',
	onClose?(): void,
	className?: string,
}>;

interface DocSharedProps<T> extends ReformedProps<T> {
	model: { _id: string } & T,
	db: PouchDB.Database<T>
	noInit?: boolean,
}

interface DocFormProps extends DocSharedProps<any> {
	mode?: '' | 'primary' | 'info' | 'success' | 'warning' | 'danger',
	onError?(error: Error): void,
	onSuccess?(res: PouchDB.Core.Response): void,
}

/**
 * Form for creating and editing PouchDB documents. Expected to be used with
 * reformed. Lower level than DocForm, and provides lifecycle hooks to
 * handle submission completion and errors.
 */
export const DocForm: React.ComponentClass<DocFormProps>

interface DocEditorProps extends ReformedProps<T> {
	onDone?(): void,
}

/**
 * Form for creating and editing PouchDB documents. Expected to be used with
 * reformed. Wraps DocForm with a notfication window for the user to see.
 */
export const DocEditor: React.ComponentClass<DocEditorProps>
