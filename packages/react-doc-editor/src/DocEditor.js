import { createElement as h, Component } from 'react'; /** @jsx createElement */
import * as PropTypes from 'prop-types';
import DocForm from './DocForm.js';
import Notification from './Notification.js';

/**
 * Form for creating and editing PouchDB documents. Expected to be used with
 * reformed.
 */
export default class DocEditor extends Component {
	static get propTypes() {
		return {
			children: PropTypes.node.isRequired,
			onDone: PropTypes.func,
		};
	}

	constructor(props) {
		super(props);
		this.state = { status: 'primary', notification: '' };

		this.handleError = this.handleError.bind(this);
		this.handleSuccess = this.handleSuccess.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleError(err) {
		this.setState({ status: 'danger', notification: err.message });
	}

	handleSuccess({ rev }) {
		const notification = h('div', {},
			'Saved!',
			h('p', { className: 'is-small' }, `rev: ${rev}`),
		);

		this.setState({ status: 'success', notification });
	}

	handleClose() {
		if (this.state.status === 'success') {
			const { onDone } = this.props;
			if (onDone) onDone();
		}

		this.setState({ notification: '' });
	}

	renderNotification() {
		if (!this.state.notification) return null;
		return h(Notification, {
			status: this.state.status,
			onClose: this.handleClose,
			className: 'is-overlay',
		},
			this.state.notification
		);
	}

	render() {
		const { status } = this.state;

		return h('div', {},
			this.renderNotification(),
			h(DocForm, Object.assign({}, this.props, {
				mode: status !== 'info' ? status : '',
				onError: this.handleError,
				onSuccess: this.handleSuccess,
			}),
				this.props.children
			)
		);
	}
}
