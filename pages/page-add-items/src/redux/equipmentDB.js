import { snakeCase } from 'lodash-es';
import transformInputToRow, { clearEquipmentOnlyKeys } from '../schema/transform.js';

export const INSERT_EQUIPMENT = 'inventory/equipmentDB/INSERT_ITEM';
export const SAVE_NEW_ITEM = 'inventory/equipmentDB/SAVE_NEW_ITEM';
export const SAVE_NEW_EQUIPMENT = 'inventory/equipmentDB/SAVE_NEW_EQUIPMENT';
const EDIT_ITEM = 'inventory/equipmentDB/EDIT_ITEM';
const EDIT_EQUIPMENT = 'inventory/equipmentDB/EDIT_EQUIPMENT';
const DELETE_ITEM = 'inventory/equipmentDB/DELETE_ITEM';
const DELETE_EQUIPMENT = 'inventory/equipmentDB/DELETE_EQUIPMENT';
const DELETE_SELECTED_EQUIPMENT = 'inventory/equipmentDB/DELETE_SELECTED_EQUIPMENT';

// Reducer
export default function equipmentDB(state = [], action = {}, selectedId = '') {
	switch (action.type) {
		case SAVE_NEW_ITEM: return [
			Object.assign(transformInputToRow(action.payload), clearEquipmentOnlyKeys),
			...state,
		];

		case SAVE_NEW_EQUIPMENT: {
			const productName = snakeCase(action.meta.product) || action.payload.product;
			let productBase = productName
				? state.find(equip => equip.product === productName)
				: undefined;
			if (productBase) {
				productBase = Object.assign({}, productBase, clearEquipmentOnlyKeys);
			}

			return [
				Object.assign({}, productBase, transformInputToRow(action.payload)),
				...state,
			];
		}

		case INSERT_EQUIPMENT: return [action.payload, ...state];

		case EDIT_ITEM: {
			const productName = snakeCase(action.meta.product) || action.payload.product;
			const changes = action.payload;
			return state.map(equip => (
				equip.product === productName
					? Object.assign({}, equip, changes)
					: equip
			));
		}

		case EDIT_EQUIPMENT: {
			const id = action.meta.id || action.payload._id;
			const changes = action.payload;
			return state.map(equip => (
				equip._id === id
					? Object.assign({}, equip, changes)
					: equip
			));
		}


		case DELETE_ITEM: {
			const productName = snakeCase(action.meta.product);
			return state.filter(equip => equip.product !== productName);
		}

		case DELETE_EQUIPMENT:
			selectedId = action.meta.id;
			// fall through
		case DELETE_SELECTED_EQUIPMENT:
			if (!selectedId) return state;
			return state.filter(equip => equip._id !== selectedId);

		default: return state;
	}
}


// Selectors
export const getDatabase = store => store.equipmentDB;
export const getColumn = (store, columnName) =>
	getDatabase(store).map(row => row[columnName]);


// Actions
export const saveNewItem = item => ({ type: SAVE_NEW_ITEM, payload: item });
export const saveNewEquipment = (payload, product) => ({
	type: SAVE_NEW_EQUIPMENT, payload, meta: { product },
});
export const editItem = (changes, product) => ({
	type: EDIT_ITEM, payload: changes, meta: { product },
});
export const editEquipment = (changes, id) => ({
	type: EDIT_EQUIPMENT, payload: changes, meta: { id },
});
export const deleteItem = product => ({ type: DELETE_ITEM, meta: { product } });
export const deleteEquipment = id => ({ type: DELETE_ITEM, meta: { id } });
export const deleteSelectedEquipment = () => ({ type: DELETE_SELECTED_EQUIPMENT });
