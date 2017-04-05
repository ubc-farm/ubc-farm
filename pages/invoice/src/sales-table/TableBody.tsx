import { createElement, PureComponent } from 'react'; /** @jsx createElement */
import { Sale } from '@ubc-farm/databases'
import { SaleRow, EditingSaleRow } from '../sale-row'

interface BodyProps {
	sales: Sale[]
	onChange(newSales: Sale[]): void,
}

interface BodyState {
	editing: Set<Sale>,
}

export default class TableBody extends PureComponent<BodyProps, BodyState> {
	constructor(props) {
		super(props);

		this.state = { editing: new Set() };
	}

	handleRowDelete(index: number) {
		const sales = [...this.props.sales];
		const [deleted] = sales.splice(index, 1);

		if (this.state.editing.has(deleted)) {
			const editing = new Set(this.state.editing);
			editing.delete(deleted);
			this.setState({ editing });
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

		this.setState(last => ({
			editing: new Set(last.editing).add(clicked)
		}));
	}

	render() {
		const { editing } = this.state;

		return (
			<tbody>
				{this.props.sales.map((sale, index) => {
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
