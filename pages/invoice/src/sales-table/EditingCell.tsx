import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Sale } from '@ubc-farm/databases';

interface EditingCellProps {
	type?: string,
	input?: React.ReactType,
	onChange: (index: number, rowData: Sale) => void,
	cellData: any,
	columnData: any,
	dataKey: string,
	isScrolling: boolean,
	rowData: Sale,
	rowIndex: number,
}

function handleChange({ onChange, rowIndex, rowData }: EditingCellProps, e) {
	onChange(rowIndex, {
		...rowData,
		[e.target.name]: e.target.value
	});
}

const EditingCell: SFC<EditingCellProps> = (props) => {
	const { type = 'text', input = 'input', dataKey, rowIndex, cellData } = props;
	return createElement(input as SFC<any>, {
		type,
		name: `${dataKey}-${rowIndex}`,
		value: cellData,
		onChange: handleChange.bind(null, props),
	});
}

export default EditingCell;
