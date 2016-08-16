/**
 * @returns a function that, when called,
 * returns a genrator object that is immediately 
 * ready for input via `next()`
 */
export default function coroutine(generator) {
	return function(...args) {
		let generatorObject = generator(...args);
		generatorObject.next();
		return generatorObject;
	}
}