import { csvFormat } from 'd3-dsv';
import { SAVE_NEW_ITEM, SAVE_NEW_EQUIPMENT } from './equipmentDB.js';

const fields = [
	'_id',
	'class',
	'product',
	'description',
	'quantity',
	'unit',
	'valuePerUnit',
	'entryDate',
	'lifeSpan',
	'location',
	'salvageValue',
	'barcode',
	'supplier',
	'sku',
];


const PUSH_DOWNLOAD = 'inventory/metadata/PUSH_DOWNLOAD';
const CLEAR_DOWNLOAD = 'inventory/metadata/CLEAR_DOWNLOAD';
const OPEN_EDITOR = 'inventory/metadata/OPEN_EDITOR';
const CLOSE_EDITOR = 'inventory/metadata/CLOSE_EDITOR';

const defaultState = {
	download: null,
	editorOpen: false,
};

// Reducer
export default function selectedReducer(state = defaultState, action, equipmentDb) {
	switch (action.type) {
		case PUSH_DOWNLOAD: {
			const filename = action.meta.filename || 'inventory.csv';
			const csv = csvFormat(equipmentDb, fields);
			return Object.assign({}, state, {
				download: { filename, csv },
			});
		}
		case CLEAR_DOWNLOAD:
			return Object.assign({}, state, { download: null });

		case OPEN_EDITOR:
			return Object.assign({}, state, { editorOpen: true });

		case CLOSE_EDITOR:
		case SAVE_NEW_ITEM:
		case SAVE_NEW_EQUIPMENT:
			return Object.assign({}, state, { editorOpen: false });

		default: return state;
	}
}


// Selectors
export const getDownloadData = state => state.metadata.download;
export const isEditorOpen = state => state.metadata.editorOpen;

// Actions
export const download = () => ({
	type: PUSH_DOWNLOAD, meta: { filename: 'inventory.csv' },
});
export const clearDownload = () => ({ type: CLEAR_DOWNLOAD });
export const openEditor = () => ({ type: OPEN_EDITOR });
export const closeEditor = () => ({ type: CLOSE_EDITOR });
