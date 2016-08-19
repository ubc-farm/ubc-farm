import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import Column from '../bits/column.js';
import Row from './row.js';

/**
 * Used for the body of the table. Rows are generated where the columns
 * are based on the columns provided. The order of the rows can be altered
 * by providing a sortMap, which is a map where the keys correspond to the
 * row's desired position, and the values correspond to the actual row key in
 * the data map. Rows can be marked as selected using the selected array, where
 * each string in the array corresponds with a key in the data map.
 * @param {Object} props
 * @param {Column[]} props.columns
 * @param {Map<string, WeakMap<Column, *>>} props.data
 * @param {string[]} props.sortMap
 * @param {Set<string>} props.selected
 * @param {function} onSelect
 */
const Body = ({
	columns, data, selected,
	onSelect: onChange,
	sortMap = Array.from(data.keys()),
}) => (
	<tbody>{
		sortMap.map(rowKey => {
			const checked = selected && selected.has(rowKey);
			const rowData = data.get(rowKey);

			const rowProps = { rowKey, checked, onChange };

			return (
				<Row {...rowProps} showCheckbox key={rowKey}>
					{columns.map(column =>
						column.toElement(column.getValue(rowData), rowKey)
					)}
				</Row>
			);
		})
	}</tbody>
);

Body.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)).isRequired,
	data: PropTypes.instanceOf(Map).isRequired,
	sortMap: PropTypes.array,
	selected: PropTypes.instanceOf(Set),
	onSelect: PropTypes.func,
};

export default Body;
