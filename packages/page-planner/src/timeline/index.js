import Timeline from 'vis-timeline'; //eslint-disable-line

import groups from './groups.js';
import items from './items.js';

const lastYear = new Date(new Date().getFullYear() - 1, 0);
const nextYear = new Date(new Date().getFullYear() + 2, 0, 0);

export default new Timeline(
	document.getElementById('timeline-mount'),
	items,
	groups,
	{
		min: lastYear,
		max: nextYear,
		editable: true,
	}
);
