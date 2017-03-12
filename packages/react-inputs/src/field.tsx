import { createElement, Component } from 'react'; /** @jsx createElement */
import { generate } from 'shortid';
import { pick } from '@ubc-farm/utils';

interface FieldProps {
	children?: React.ReactType;
	id?: string;
	containerProps?: Object;
	labelProps?: Object;
	[inputProp: string]: any;
}

/**
 * A field that contains an input and corresponding label.
 * An ID will be auto-generated if it isn't specified.
 */
export default class Field extends Component<FieldProps, { id: string }> {
	hash: string;
	constructor(props: FieldProps) {
		super(props);

		this.hash = generate();
		this.state = {
			id: props.name ? `${props.name}-${this.hash}` : this.hash,
		};
	}

	componentWillReceiveProps(nextProps: FieldProps) {
		if (nextProps.name !== this.props.name) {
			this.setState({ id: `${nextProps.name}-${this.hash}` });
		}
	}

	render() {
		const {
			children,
			name,
			containerProps,
			labelProps,
			rest,
		} = pick(this.props, 'children', 'name', 'containerProps', 'labelProps');

		const id = this.props.id || this.state.id;

		return (
			<div className="field-container" {...containerProps}>
				<label htmlFor={id} {...labelProps}>{children}</label>
				<input id={id} name={name} {...rest} />
			</div>
		);
	}
}
