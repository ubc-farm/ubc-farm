export const SOME_ACTION = 'SOME_ACTION';

export function doSomeAction(param) {
	return { type: SOME_ACTION, payload: param };
}
