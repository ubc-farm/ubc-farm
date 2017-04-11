import { createElement, Component } from 'react'; /** @jsx createElement */
import { ReformedProps } from '@ubc-farm/react-inputs';

import DocForm from './DocForm';
import Notification from './Notification';

interface EditorProps<T> extends ReformedProps<T> {
	model: { _id: string } & T,
	db: PouchDB.Database<T>
	noInit?: boolean,
	onDone?(): void,
}

interface EditorState {
	status: '' | 'primary' | 'info' | 'success' | 'warning' | 'danger',
	notification: React.ReactElement<any> | string,
}

/**
 * Form for creating and editing PouchDB documents. Expected to be used with
 * reformed. Provides lifecycle hooks to
 */
export default class DocEditor extends Component<EditorProps<any>, EditorState> {
	constructor(props) {
		super(props);
		this.state = { status: 'primary', notification: '' };

		this.handleError = this.handleError.bind(this);
		this.handleSuccess = this.handleSuccess.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleError(err: Error) {
		this.setState({ status: 'danger', notification: err.message });
	}

	handleSuccess(res: PouchDB.Core.Response) {
		const notification = (
			<div>
				Saved!
				<p className="is-small">{`rev: ${res.rev}`}</p>
			</div>
		);

		this.setState({ status: 'success', notification });
	}

	handleClose() {
		if (this.state.status === 'success') {
			const { onDone } = this.props;
			onDone && onDone();
		}

		this.setState({ notification: '' });
	}

	renderNotification() {
		if (!this.state.notification) return null;
		return (
			<Notification
				status={this.state.status || undefined}
				onClose={this.handleClose}
				className="is-overlay"
			>
				{this.state.notification}
			</Notification>
		)
	}

	render() {
		const { status } = this.state;

		return (
			<div>
				{this.renderNotification()}
				<DocForm
					{...this.props}
					mode={status !== 'info' ? status : ''}
					onError={this.handleError}
					onSuccess={this.handleSuccess}
				>
					{this.props.children}
				</DocForm>
			</div>
		)
	}
}
