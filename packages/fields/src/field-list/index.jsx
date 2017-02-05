import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import asyncHOC from './asyncHOC.js';
import FieldList from './FieldList.jsx';

export default function createFieldList(fields) {
	const ConnectedFieldList = asyncHOC(
		() => fields,
		{ dataProp: 'rows', dataDefault: [] },
	)(FieldList);
	render(<ConnectedFieldList />, document.getElementById('reactRoot'));
}
