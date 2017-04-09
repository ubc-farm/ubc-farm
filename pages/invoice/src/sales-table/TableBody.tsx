import { createElement, PureComponent } from 'react'; /** @jsx createElement */
import { IdSale } from './types';
import { SaleRow, EditingSaleRow } from './sale-row'

interface BodyProps {
	sales: IdSale[],
	editing: Set<symbol>,
	onChange(newSales: IdSale[]): void,
	toggleEditing(id: symbol): void,
	deleteEditing(id: symbol): void,
}

export default class TableBody extends PureComponent<BodyProps, void> {
	constructor(props) {
		super(props);

		this.handleRowChange = this.handleRowChange.bind(this);
		this.handleRowClick = this.handleRowClick.bind(this);
		this.handleRowDelete = this.handleRowDelete.bind(this);
	}

	handleRowDelete(id: symbol) {
		const sales = [...this.props.sales];

		const index = sales.findIndex(sale => sale.id === id);
		sales.splice(index, 1);

		if (this.props.editing.has(id)) {
			this.props.deleteEditing(id);
		}

		this.props.onChange(sales);
	}

	handleRowChange(id: symbol, e: React.ChangeEvent<any>) {
		const sales = [...this.props.sales];
		const index = sales.findIndex(sale => sale.id === id);
		const prev = sales[index];

		sales[index] = {
			...prev,
			[e.target.name]: e.target.value,
		};

		this.props.onChange(sales);
	}

	handleRowClick(id: symbol) {
		this.props.toggleEditing(id);
	}

	render() {
		const { sales, editing } = this.props;

		return (
			<tbody>
				{sales.map((sale) => {
					if (editing.has(sale.id)) {
						return (
							<EditingSaleRow
								sale={sale} key={sale.id.toString()} id={sale.id}
								onChange={this.handleRowChange}
								onClick={this.handleRowClick}
							/>
						);
					} else {
						return (
							<SaleRow
								sale={sale} key={sale.id.toString()} id={sale.id}
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
