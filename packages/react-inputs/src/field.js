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
		const mainProps = {};
		const inputProps = {};

		for (const [key, value] of Object.entries(this.props)) {
			if (mainKeys.has(key)) mainProps[key] = value;
			else inputProps[key] = value;
		}

		const { containerProps, labelProps, children, name } = mainProps;
		const id = this.props.id || this.state.id;

		containerProps.className = 'field-container';
		labelProps.htmlFor = id;
		inputProps.id = id;
		inputProps.name = name;

		return h(
			'div', containerProps, [
				h('label', labelProps, children),
				h('input', inputProps),
			]
		);
	}
}
