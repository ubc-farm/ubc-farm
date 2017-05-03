import { createElement as h, Component } from 'react'; /** @jsx createElement */
import * as PropTypes from 'prop-types';
import { Field } from '@ubc-farm/react-inputs';
import { classlist } from '@ubc-farm/utils';

/**
 * Form for creating and editing PouchDB documents. Expected to be used with
 * reformed. Lower level than DocForm, and provides lifecycle hooks to
 * handle submission completion and errors.
 * When using the form, pass an object with an `_id` property as the model.
 * Additional data for the model is automatically loaded from the database.
 * The form expects to use the same object during its lifetime, so the ID will
 * always be the same.
 */
export default class DocForm extends Component {
	static get propTypes() {
		return {
			children: PropTypes.node.isRequired,
			model: PropTypes.shape({
				_id: PropTypes.string.isRequired
			}).isRequired,
			db: PropTypes.any.isRequired,
			setModel: PropTypes.func.isRequired,
			onSuccess: PropTypes.func,
			onError: PropTypes.func,
			noInit: PropTypes.bool,
			mode: PropTypes.oneOf(['', 'primary', 'info', 'success', 'warning', 'danger']),
		};
	}

	/**
	 * @param {any} props
	 * @param {any} props.children - fields for the form to display
	 * @param {{ _id: string } & any} props.model - data used by the form. The
	 * model should correspond to a current/future entry in the database.
	 * @param {PouchDB.Database<any>} props.db - PouchDB where the model is saved
	 * to when done
	 * @param {function} props.setModel - function called to replace model with
	 * new object.
	 * @param {function} [props.onSuccess] - called once the model has been saved.
	 * @param {function} [props.onError] - called if there is an error saving the model.
	 * @param {boolean} [props.noInit] - if true, uses the model prop for initial
	 * data rather than loading a new copy using the model's ID.
	 * @param {string} [props.mode] - state for the submit button
	 */
	constructor(props) {
		super(props);
		this.state = { loading: true };
		this.id = props.model._id;

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	/** Loads the model when the form is created, unless noInit is true */
	componentDidMount() {
		if (this.props.noInit) return;
		this.reloadDoc();
	}

	/**
	 * Reloads the model using the database.
	 */
	async reloadDoc() {
		const { db, setModel, onError } = this.props;
		this.setState({ loading: true });

		try {
			const model = await db.get(this.id);
			setModel(model);
		} catch (err) {
			if (err.status !== 404) {
				if (onError) onError(err);
			}
		}

		this.setState({ loading: false });
	}

	/**
	 * Handles form submit event by saving the model to the database,
	 * and calling `onSuccess` or `onError`.
	 * @param {React.FormEvent} e
	 */
	async handleSubmit(e) {
		e.preventDefault();

		const { db, model, onError, onSuccess } = this.props;
		this.setState({ loading: true });

		try {
			const res = await db.put(model);
			await this.reloadDoc();
			if (onSuccess) onSuccess(res);
		} catch (err) {
			if (onError) onError(err);
		}

		this.setState({ loading: false });
	}

	/**
	 * Renders the form with the child field elements,
	 * along with a submit button reflecting the form state.
	 */
	render() {
		const { loading } = this.state;
		let { mode } = this.props;

		if (!mode) mode = 'primary';

		return h('form', { onSubmit: this.handleSubmit },
			this.props.children,
			h(Field, {},
				h('button', {
					type: 'submit',
					className: classlist(
						'button', `is-${mode}`,
						{ 'is-loading': Boolean(loading) },
					),
				},
					'Save'
				)
			)
		);
	}
}
