import { DataSet } from 'vis-timeline';
import { observeStore } from 'ubc-farm-utils';
import { locationsList } from '../redux/selectors.js';

const groups = new DataSet(undefined, { queue: true });

/**
 * Updates the dataset with the new items whenever the
 * state slice changes.
 */
function updateDataSet(sourceState) {
	groups.forEach(
		({ id }) => groups.remove(id),
		{ filter: ({ id }) => !sourceState.has(id) }
	);

	for (const [id, value] of sourceState) {
		const data = Object.assign({ id }, value);
		groups.add(data);
	}
}

const listen = store => observeStore(store, locationsList, updateDataSet);

export {
	listen,
	groups as default,
};
