import { createElement, Component } from 'react'; /** @jsx createElement */
import { Field, ReformedProps } from '@ubc-farm/react-inputs';
import { classlist } from '@ubc-farm/utils';

interface DocFormProps<T> extends ReformedProps<T> {
	model: { _id: string } & T,
	db: PouchDB.Database<T>
	noInit?: boolean,
	mode?: '' | 'primary' | 'info' | 'success' | 'warning' | 'danger',
	onError?(error: Error): void,
	onSuccess?(res: PouchDB.Core.Response): void,
}

interface DocFormState {
	loading: boolean,
}

/**
 * Form for creating and editing PouchDB documents. Expected to be used with
 * reformed. Provides lifecycle hooks to
 */
export default class DocForm extends Component<DocFormProps<any>, DocFormState> {
	id: string;

	constructor(props: DocFormProps<any>) {
		super(props);
		this.state = { loading: true };
		this.id = props.model._id;

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
		if (this.props.noInit) return;
		const { db, setModel, onError } = this.props;

		try {
			const model = await db.get(this.id);
			setModel(model);
		} catch (err) {
			if (err.status !== 404) onError && onError(err);
		}

		this.setState({ loading: false });
	}

	async handleSubmit(e: React.FormEvent<any>) {
		e.preventDefault();

		const { db, model, onError, onSuccess } = this.props;
		try {
			const res = await db.put(model);
			onSuccess && onSuccess(res);
		} catch (err) {
			onError && onError(err);
		}
	}

	render() {
		const { mode, children } = this.props;
		const { loading } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				{children}

				<Field>
					<button
						type="submit"
						className={classlist(
							'button',
							{ 'is-loading': Boolean(loading) },
							mode ? `is-${mode}` : 'is-primary',
						)}
					>
						Save
					</button>
				</Field>
			</form>
		);
	}
}
