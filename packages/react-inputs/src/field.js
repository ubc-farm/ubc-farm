import { createElement as h, Component } from 'react';
import { generate } from 'shortid';

const mainKeys = new Set(['children', 'name', 'containerProps', 'labelProps']);

/**
 * A field that contains an input and corresponding label.
 * An ID will be auto-generated if it isn't specified.
 */
export default class Field extends Component {
	constructor(props) {
		super(props);

		this.hash = generate();
		this.state = {
			id: props.name ? `${props.name}-${this.hash}` : this.hash,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.name !== this.props.name) {
			this.setState({ id: `${nextProps.name}-${this.hash}` });
		}
	}

	render() {
		const id = this.props.id || this.state.id;
		const { label, children } = this.props;

		const htmlFor = id;

		return h('div', { className: 'field is-horizontal' },
			h('div', { className: 'field-label is-normal' },
				h('label', { className: 'label', htmlFor }, label)
			),
			h('div', { className: 'field-body' },
				h('div', { className: 'field' },
					h('div', { className: 'control' },
						children
					)
				)
			),
		);
	}
}
