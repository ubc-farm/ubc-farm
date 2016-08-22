import { createElement, PropTypes, PureComponent } from 'react';
/** @jsx createElement */

export default class RelationSelect extends PureComponent {
	static get propTypes() {
		return {
			input: PropTypes.object,
			meta: PropTypes.object,
			url: PropTypes.string,
			textProp: PropTypes.string,
		};
	}

	static get defaultProps() {
		return {
			textProp: 'name',
		};
	}

	constructor(props) {
		super(props);

		this.state = { items: [] };
		this.updateItems();
	}

	updateItems() {
		return fetch(this.props.url)
			.then(response => {
				if (response.ok) return response.json();
				throw new Error(`Response status ${response.statusText}`);
			})
			.then(items => this.setState({ items }));
	}

	render() {
		const { input, textProp } = this.props;
		const { items } = this.state;

		const options = [<option value="" key="___" />];
		for (const id in items) {
			if (Object.prototype.hasOwnProperty.call(items, id)) {
				const name = items[id][textProp];
				options.push(<option value={id} key={id}>{name}</option>);
			}
		}

		return (
			<select {...input}>{options}</select>
		);
	}
}
