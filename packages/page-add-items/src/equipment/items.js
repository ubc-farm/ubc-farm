import { createElement, PropTypes, PureComponent } from 'react';
/** @jsx createElement */

export default class ItemSelect extends PureComponent {
	static get propTypes() {
		return {
			input: PropTypes.object,
			meta: PropTypes.object,
			items: PropTypes.shape({
				id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
				name: PropTypes.string,
			}),
		};
	}

	constructor(props) {
		super(props);
		this.state = { items: [] };
		this.updateItems();
	}

	updateItems() {
		return fetch('http://localhost:3000/api/items?array')
			.then(response => {
				if (response.ok) return response.json();
				throw new Error(`Response status ${response.statusText}`);
			})
			.then(items => this.setState({ items }));
	}

	render() {
		const { input } = this.props;
		const { items } = this.state;

		const options = [];
		for (const { id, name } of items) {
			options.push(<option value={id}>{name}</option>);
		}

		return (
			<select {...input}>{options}</select>
		);
	}
}
