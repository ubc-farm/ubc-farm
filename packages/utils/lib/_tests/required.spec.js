import required from '../required';

/* eslint-disable no-unused-vars */

test('required', () => {
	function simpleFunc(foo = required()) {}
	expect(simpleFunc).toThrow(TypeError);
	expect(() => simpleFunc('bar')).not.toThrow();

	function complexFunc(a = required(), options) {}
	expect(() => complexFunc(undefined)).toThrow(TypeError);
	expect(() => complexFunc('b')).not.toThrow();
});

test('required message', () => {
	function func(foo = required('foo')) {}

	expect(func).toThrow(/foo/);
	expect(func).toThrow(/ foo/);
})
