import test from 'tape';
import {classlist} from '../'

test('classlist', t => {
	t.equal(classlist({
		a: true,
		b: false,
		c: 0,
		d: null,
		e: undefined,
		f: 1
	}), 'a f', 'keeps object keys with truthy values');

	t.equal(classlist('a', 0, null, undefined, true, 1, 'b'), 'a 1 b',
		'joins arrays of class names and ignore falsy values');
	
	t.equal(classlist({a: true}, 'b', 0), 'a b', 
		'supports heterogenous arguments');

	t.equal(classlist('', 'b', {}, ''), 'b', 
		'should be trimmed');

	t.equal(classlist({}), '', 
		'returns an empty string for an empty configuration');

	t.equal(classlist(['a', 'b']), 'a b', 
		'supports an array of class names');

	t.equal(classlist(['a', 'b'], 'c'), 'a b c', 
		'joins array arguments with string arguments');

	t.equal(classlist(['a', 'b'], ['c', 'd']), 'a b c d', 
		'handles multiple array arguments');

	t.equal(classlist(['a', 0, null, undefined, false, true, 'b']), 'a b', 
		'handles arrays that include falsy and true values');

	t.equal(classlist(['a', ['b', 'c']]), 'a b c', 
		'handles arrays that include arrays');

	t.equal(classlist(['a', {b: true, c: false}]), 'a b', 
		'handles arrays that include objects');

	t.equal(classlist(['a', ['b', ['c', {d: true}]]]), 'a b c d', 
		'handles deep array recursion');

	t.end();
})