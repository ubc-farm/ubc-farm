let assertFunc;

export class AssertionError extends Error {};

if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
	assertFunc = (assertion, message) => {
		if (!assertion) throw new AssertionError(message);
	};
} else {
	assertFunc = () => {};
}

const assert = assertFunc;
export default assert;
