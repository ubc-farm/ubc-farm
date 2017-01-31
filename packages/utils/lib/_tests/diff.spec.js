import { diff, REMOVED } from '../';

const store = {
	path: 'some/path',
	messages: ['hi'],
	data: {
		sda2q3q: {
			file: 'hello.world'
		},
		dsadd2: {
			file: 'foo.bar'
		}
	},
	undef: undefined
};

const clone = newVal => Object.assign({}, store, newVal);

test('diff primitives', () => {
	expect(diff('foo', 'foo')).toBeUndefined();
	expect(diff('foo', 'bar')).toBe('bar');
	expect(diff(null, 'hello')).toBe('hello');
});

test('diff arrays', () => {
	expect(diff(store.messages, store.messages)).toBeUndefined();
	expect(diff(store.messages, clone().messages)).toBeUndefined();

	expect(diff(store.messages, ['hi', 'earth'])).toEqual([undefined, 'earth']);
	expect(diff(store.messages, [])).toEqual([REMOVED]);

	const longArray = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
	const smallerArray = ['ipsum', 'sit'];

	expect(diff(longArray, smallerArray))
		.toEqual([REMOVED, undefined, REMOVED, undefined, REMOVED]);

	const differentArray = ['ipsum', 'sit', 'bacon'];
	expect(diff(longArray, differentArray))
		.toEqual([REMOVED, undefined, REMOVED, undefined, REMOVED, 'bacon']);
});

test('diff objects', () => {
	const blank = {};
	expect(diff(blank, blank)).toBeUndefined();
	expect(diff(store.data, clone().data)).toBeUndefined();

	const changePath = clone({ path: 'new/location' });
	expect(diff(store, changePath)).toEqual({ path: 'new/location' });

	const removedProp = clone();
	delete removedProp.messages;
	expect(diff(store, removedProp)).toEqual({ messages: REMOVED });

	const nestedData = Object.assign({}, store.data);
	delete nestedData.sda2q3q;
	const removedNested = clone({
		data: nestedData
	});
	expect(diff(store, removedNested)).toEqual({ data: { sda2q3q: REMOVED } });

	const copy = clone();
	copy.data = Object.assign({}, copy.data, {
		dsader3: {
			file: 'bat.box'
		}
	});

	expect(diff(store, copy)).toEqual({ data: { dsader3: { file: 'bat.box' } } });
});
