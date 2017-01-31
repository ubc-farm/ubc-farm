import { classlist } from '../';

test('classlist', () => {
	expect(classlist({
		a: true,
		b: false,
		c: 0,
		d: null,
		e: undefined,
		f: 1
	})).toBe('a f');

	expect(classlist('a', 0, null, undefined, true, 1, 'b')).toBe('a 1 b');
	expect(classlist({ a: true }, 'b', 0)).toBe('a b');
	expect(classlist('', 'b', {}, '')).toBe('b');
	expect(classlist({})).toBe('');
	expect(classlist(['a', 'b'])).tobe('a b');
	expect(classlist(['a', 'b'], 'c')).toBe('a b c');
	expect(classlist(['a', 'b'], ['c', 'd'])).toBe('a b c d');
	expect(classlist(['a', 0, null, undefined, false, true, 'b'])).toBe('a b');
	expect(classlist(['a', ['b', 'c']])).toBe('a b c');
	expect(classlist(['a', { b: true, c: false }])).toBe('a b');
	expect(classlist(['a', ['b', ['c', { d: true }]]])).toBe('a b c d');
});
