import { createElement, PureComponent } from 'react'; /** @jsx createElement */
import { Invoice } from '@ubc-farm/databases'

interface BodyProps {
	invoice: Invoice,
	onClick(name: string): void,
}

export default class TableBody extends PureComponent<BodyProps, void> {
	click: { [key: string]: () => void };

	constructor(props) {
		super(props);
		this.updateHandlers();
	}

	updateHandlers() {
		const { onClick } = this.props;
		this.click = {
			item() { onClick('item') },
			description() { onClick('description') },
			unitCost() { onClick('unitCost') },
			quantity() { onClick('quantity') },
			price() { onClick('price') },
		}
	}

	render() {
		return (
			<thead>
				<tr>
					<th onClick={this.click.item}>Item</th>
					<th onClick={this.click.description}>Description</th>
					<th onClick={this.click.unitCost}>Unit Cost</th>
					<th onClick={this.click.quantity}>Quantity</th>
					<th onClick={this.click.price}>Price</th>
					<th></th>
				</tr>
			</thead>
		);
	}
}
