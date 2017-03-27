import {coroutine} from 'ubc-farm-utils';

/**
 * Generator observer for finding the most common 'parent'
 * attribute in a collection.
 * Once ready, the parent should be passed into the generator
 * by calling `.next('someParentID')`. 
 * When a result is desired, call `.return()`.
 */
function* getCommonParent() {
	let parents = new Map();
	try {
		while (true) {
			const parent = yield;
			if (parent != undefined) {
				let count = parents.get(parent) || 0;
				parents.set(parent, count + 1);
			} 
		}
	} finally {
		let mostCommonParent, greatestCount = 0;
		for (const [parent, count] of parents) {
			if (count > greatestCount) {
				greatestCount = count;
				mostCommonParent = parent;
			}
		}
		
		yield mostCommonParent;
	}
}

export default coroutine(getCommonParent);