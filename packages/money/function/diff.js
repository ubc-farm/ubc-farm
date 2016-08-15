const has = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

export const REMOVED = Symbol();

/**
 * Returns an object only containing properties that have changed between
 * the two given objects.
 * @param {Object} oldStore
 * @param {Object} newStore
 * @returns {Object[]} an object with only updated keys. Removed keys are
 * given a value of the REMOVED Symbol.
 * @alias module:lib/utils.diff
 */
export default function diff(oldStore, newStore) {
	if (oldStore === newStore) return undefined;
	if (typeof newStore !== typeof oldStore) return newStore;
	else if (Array.isArray(newStore)) {
		let clone = [...newStore];
		return oldStore.reduce((difference, oldValue) => {
			const newIndex = clone.indexOf(oldValue);
			if (newIndex === -1) difference.push(REMOVED);
			else {
				const subdiff = diff(oldValue, clone[newIndex]);
				difference.push(subdiff);
				clone.splice(newIndex, 1); 
			}
			return difference;
		}, []).concat(clone);
	} else if (typeof newStore == 'object' && newStore !== null) {
		let oldKeys = Object.keys(oldStore);
		let difference = {};
		for (let newKey in newStore) {
			if (!has(oldStore, newKey)) difference[newKey] = newStore[newKey];
			else {
				const subdiff = diff(oldStore[newKey], newStore[newKey]);
				if (subdiff !== undefined) difference[newKey] = subdiff;
				oldKeys.splice(oldKeys.indexOf(newKey), 1);
			}
		}
		for (let removedKey of oldKeys) difference[removedKey] = REMOVED;
		return difference;
	} else return newStore;
}