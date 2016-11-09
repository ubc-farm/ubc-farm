# @ubc-farm/table-base

Basic Table component for React that takes a JSON array and column descriptor
elements to render a table.

```jsx
import TableBase, { Column } from '@ubc-farm/table-base';

const tableData = [
  {id: 1, name: "name1", price: 100},
  {id: 2, name: "name2", price: 120},
  {id: 3, name: "name3", price: 130},
  {id: 4, name: "name4", price: 140},
  {id: 5, name: "name5", price: 110}
];

<TableBase tableData={tableData}>
	<Column field="id" isKey>ID</Column>
	<Column field="name">Name</Column>
	<Column field="price"><em>Price ($)</em></Column>
</TableBase>
```

## Usage

### Table props
| name | type | description |
|------|------|-------------|
| **children** | `Column[]` | Column descriptors |
| **tableData** | `Object[]` | Data to render |
| keyField | `string` | The key field in each object. Can alternatively be specified in the Column |
| rowClassName | `string | function` | Additional className for rows. If a function, will be called to obtain the class for a given row (`(row, rowIndex) => string`) |
| tableClassName | `string` | Class for the table container. |
| headClassName | `string` | Class for the table head |
| bodyClassName | `string` | Class for the table body |
| headRowClassName | `string` | Class for the row inside the table head |
| onRowClick | `function` | Click handler with `(row, event)` arguments |
| onRowMouseEnter | `function` | Mouse enter handler with `(row, event)` arguments |
| onRowMouseLeave | `function` | Mouse leave handler with `(row, event)` arguments |
| onMouseEnter | `function` | Mouse enter handler for the entire table |
| onMouseLeave | `function` | Mouse leave handler for the entire table |

### Column props
| name | type | description |
|------|------|-------------|
| **field** | `string` | The object key this column corresponds to |
| children | `ReactNode` | Content to show in the table header cell |
| isKey | `boolean` | Sets the column as the key field for each JSON object. Alternative to Table keyField |
| format | `function` | Function to format cell data: `(cell, row) => ReactNode` |
| hidden | `boolean` | If true, column is hidden from view |
| columnClassName | `string | function` | Classes for cells in the column. If a function, will be called to obtain the class for a given cell (`(cell, row, rowIndex) => string`) |
| headerClassName | `string` | Class for the header cell corresponding to the column |
| onHeaderClick | `function` | Click event for the header cell |
| onCellClick | `function` | Click handler for cells in this column (takes `(cell, row, rowIndex)`). |
