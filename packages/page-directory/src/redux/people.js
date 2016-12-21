import { snakeCase } from 'lodash-es';
import transformInputToRow from '../schema/transform.js';

export const INSERT_PERSON = 'directory/people/INSERT_PERSON';
const SAVE_NEW_PERSON = 'directory/people/SAVE_NEW_PERSON';
const EDIT_PERSON = 'directory/people/EDIT_PERSON';
const DELETE_PERSON = 'directory/people/DELETE_PERSON';

// Reducer
export default function people(state = [], action = {}) {
	switch (action.type) {
		case INSERT_PERSON: return [action.payload, ...state];
		case SAVE_NEW_PERSON: return [
			transformInputToRow(action.payload),
			...state,
		];

		case EDIT_PERSON: {
			const id = action.meta.id || action.payload._id;
			const changes = action.payload;
			const index = state.findIndex(person => person._id === id);

			const newState = [...state];
			newState[index] = Object.assign({}, newState[index], changes);
			return newState;
		}

		case DELETE_PERSON:
			const toDelete = action.meta.id;
			return state.filter(equip => equip._id !== toDelete);

		default: return state;
	}
}


// Selectors
export const getDatabase = store => store.people;


// Actions
export const saveNewPerson = person => ({
	type: SAVE_NEW_PERSON, payload: person
});
export const editPerson = (changes, id) => ({
	type: EDIT_PERSON, payload: changes, meta: { id }
});
export const deletePerson = toDelete => ({
	type: EDIT_PERSON, meta: { id: toDelete }
});
