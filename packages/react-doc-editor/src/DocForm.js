import { createElement as h, Component } from 'react'; /** @jsx createElement */
import * as PropTypes from 'prop-types';
import { Field } from '@ubc-farm/react-inputs';
import { classlist } from '@ubc-farm/utils';

/**
 * Form for creating and editing PouchDB documents. Expected to be used with
 * reformed. Provides lifecycle hooks to handle submission completion.
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
			mode: PropTypes.oneOf(['', 'primary', 'info', 'success', 'warning', 'danger'])
		};
	}

	constructor(props) {
		super(props);
		this.state = { loading: true };
		this.id = props.model._id;

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.noInit) return;
		this.reloadDoc();
	}

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

	render() {
		const { mode, children } = this.props;
		const { loading } = this.state;

		return h('form', { onSubmit: this.handleSubmit },
			children,
			h(Field, {},
				h('button', {
					type: 'submit',
					className: classlist(
						'button',
							{ 'is-loading': Boolean(loading) },
							mode ? `is-${mode}` : 'is-primary',
					),
				},
					'Save'
				)
			)
		);
	}
}
