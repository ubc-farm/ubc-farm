import { createElement } from 'react'; /** @jsx createElement */
import { AutoSizer } from 'react-virtualized';
import PouchTable from './PouchTable.jsx';

const AutoSizedTable = props => (
	<AutoSizer>
		{sizes => <PouchTable {...sizes} {...props} />}
	</AutoSizer>
);

export default AutoSizedTable;
