import { parsed } from 'document-promises';
import { createElement } from 'react';
import { render } from 'react-dom';
import { getLongTerm, connectAll } from '@ubc-farm/databases';
import LongTermChart from './LongTermChart';

const LongTermDBChart = connectAll({
	rowKey: 'data',
	useArray: true,
})(LongTermChart);

export default async function createChart() {
	const [db] = await Promise.all([getLongTerm(), parsed]);

	render(
		createElement(LongTermDBChart, { db }),
		document.getElementById('reactRoot'),
	);
}
