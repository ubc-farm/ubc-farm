import Timeline from 'vis-timeline'; //eslint-disable-line

import groups, { listen as listenGroups } from './groups.js';
import items, { listen as listenItems } from './items.js';

import onAdd from './onadd.js';
import onMove from './onmove.js';
import onRemove from './onremove.js';

const lastYear = new Date(new Date().getFullYear() - 1, 0);
const nextYear = new Date(new Date().getFullYear() + 2, 0, 0);

export default new Timeline(
	document.getElementById('timeline-mount'),
	items,
	groups,
	{
		onAdd,
		onMove,
		onRemove,
		min: lastYear,
		max: nextYear,
		editable: true,
		selectable: true,
		multiselect: false,
	}
);
export function listen(store) {
	const groupUnsub = listenGroups(store);
	const itemUnsub = listenItems(store);

	return function unsubscribeTimeline() {
		groupUnsub();
		itemUnsub();
	};
}
