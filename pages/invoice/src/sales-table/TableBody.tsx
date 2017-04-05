import { createElement, PureComponent } from 'react'; /** @jsx createElement */
import { Sale } from '@ubc-farm/databases'
import { SaleRow, EditingSaleRow } from './sale-row'

interface BodyProps {
	sales: Sale[],
	editing: Set<Sale>,
	onChange(newSales: Sale[]): void,
	addEditing(sale: Sale): void,
	deleteEditing(sale: Sale): void,
}

export default class TableBody extends PureComponent<BodyProps, void> {
	constructor(props) {
		super(props);

		this.handleRowChange = this.handleRowChange.bind(this);
		this.handleRowClick = this.handleRowClick.bind(this);
		this.handleRowDelete = this.handleRowDelete.bind(this);
	}

	handleRowDelete(index: number) {
		const sales = [...this.props.sales];
		const [deleted] = sales.splice(index, 1);

		if (this.props.editing.has(deleted)) {
			this.props.deleteEditing(deleted);
		}

		this.props.onChange(sales);
	}

	handleRowChange(index: number, e: React.ChangeEvent<any>) {
		const sales = [...this.props.sales];
		const prev = sales[index];

		sales[index] = {
			...prev,
			[e.target.name]: e.target.value,
		};

		this.props.onChange(sales);
	}

	handleRowClick(index: number) {
		const clicked = this.props.sales[index];
		this.props.addEditing(clicked);
	}

	render() {
		const { sales, editing } = this.props;

		return (
			<tbody>
				{sales.map((sale, index) => {
					if (editing.has(sale)) {
						return (
							<EditingSaleRow
								sale={sale} key={index} index={index}
								onChange={this.handleRowChange}
								onClick={this.handleRowClick}
							/>
						);
					} else {
						return (
							<SaleRow
								sale={sale} key={index} index={index}
								onDelete={this.handleRowDelete}
								onClick={this.handleRowClick}
							/>
						);
					}
				})}
			</tbody>
		);
	}
}
