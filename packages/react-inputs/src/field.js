import { createElement as h, cloneElement, Component } from 'react';
import { generate } from 'shortid';
import { camelCase, startCase } from 'lodash';

/**
 * A field that contains an input and corresponding label.
 * An ID will be auto-generated if it isn't specified.
 */
export default class Field extends Component {
	constructor(props) {
		super(props);
		this.hash = generate();
	}

	getID() {
		const { htmlFor, name, label } = this.props;
		if (htmlFor) return htmlFor;
		else if (name) return `${name}-${this.hash}`;
		else if (label) return `${camelCase(label)}-${this.hash}`;
		else return this.hash;
	}

	getLabel(htmlFor) {
		const { label, name } = this.props;
		let labelText;
		if (!label) {
			if (!name) return null;
			labelText = startCase(name);
		} else if (typeof label === 'string') {
			labelText = label;
		}

		if (labelText) return h('label', { className: 'label', htmlFor }, label);
		else return cloneElement(label, { htmlFor });
	}

	render() {
		const id = this.getID();
		const { label, children, name } = this.props;

		const inputProps = {};
		if (!this.props.htmlFor) inputProps.id = id;
		if (name) inputProps.name = name;

		return h('div', { className: 'field is-horizontal' },
			h('div', { className: 'field-label is-normal' },
				this.getLabel(),
			),
			h('div', { className: 'field-body' },
				h('div', { className: 'field' },
					h('div', { className: 'control' },
						cloneElement(children, inputProps)
					)
				)
			),
		);
	}
}
