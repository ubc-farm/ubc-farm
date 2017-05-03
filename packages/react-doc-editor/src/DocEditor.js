import { createElement as h, Component } from 'react'; /** @jsx createElement */
import * as PropTypes from 'prop-types';
import DocForm from './DocForm.js';
import Notification from './Notification.js';

/**
 * Form for creating and editing PouchDB documents. Expected to be used with
 * reformed. Wraps DocForm with a notfication window for the user to see.
 */
export default class DocEditor extends Component {
	static get propTypes() {
		return {
			children: PropTypes.node.isRequired,
			model: PropTypes.shape({
				_id: PropTypes.string.isRequired
			}).isRequired,
			db: PropTypes.any.isRequired,
			setModel: PropTypes.func.isRequired,
			noInit: PropTypes.bool,
			onDone: PropTypes.func,
		};
	}

	/**
	 * @param {any} props
	 * @param {function} props.onDone called when the form has been submitted and
	 * saved to the database.
	 * @param {ReactElement} props.children children of the inner DocForm
	 */
	constructor(props) {
		super(props);
		this.state = { status: 'primary', notification: '' };

		this.handleError = this.handleError.bind(this);
		this.handleSuccess = this.handleSuccess.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	/**
	 * Shows an error notification when an error is thrown
	 * @param {Error} err
	 */
	handleError(err) {
		this.setState({ status: 'danger', notification: err.message });
	}

	/**
	 * Displays a "Saved!" notification, along with data about the new document
	 * revision.
	 */
	handleSuccess({ rev }) {
		const notification = h('div', {},
			'Saved!',
			h('p', { className: 'is-small' }, `rev: ${rev}`),
		);

		this.setState({ status: 'success', notification });
	}

	/**
	 * Handles the close event from the notification.
	 * If the form has been saved, onDone() is called
	 */
	handleClose() {
		if (this.state.status === 'success') {
			const { onDone } = this.props;
			if (onDone) onDone();
		}

		this.setState({ notification: '' });
	}

	/**
	 * Helper function to render the notifications linked to the form.
	 * @returns {React.ReactElement}
	 */
	renderNotification() {
		if (!this.state.notification) return null;
		return h(Notification, {
			status: this.state.status,
			onClose: this.handleClose,
			className: 'is-overlay',
			children: this.state.notification,
		});
	}

	render() {
		let { status } = this.state;
		if (status === 'info') status = '';

		return h('div', {},
			this.renderNotification(),
			h(DocForm, Object.assign({}, this.props, {
				mode: status,
				onError: this.handleError,
				onSuccess: this.handleSuccess,
			}),
				this.props.children
			)
		);
	}
}
