import test from 'tape';
import {shallowTransform, removeNullandUndef}
	from './transformer.js';

test('shallowTransform', t => {
	const object = {
		string: 'hello',
		number: 1,
		null: null,
		undef: undefined,
		sym: Symbol(),
		bool: false,
		func() {},
		obj: {},
		arr: []
	}

	const shallow = Object.assign({}, object, {
		func: true, obj: true, arr: true
	});

	t.plan(2);

	t.deepEqual(shallowTransform(object), shallow,
		'Replaces objects and functions with true (but leaves nulls alone)');

	t.deepEqual(shallowTransform(object, false), object,
		'Can be turned off using a flag');
})

test('removeNullandUndef', t => {
	const object = {
		string: 'hello',
		number: 1,
		null: null,
		undef: undefined,
		sym: Symbol(),
		bool: false,
		func() {},
		obj: {
			thing: null	
		},
		arr: []
	}

	const expected = {
		string: 'hello',
		number: 1,
		sym: object.sym,
		bool: false,
		func: object.func,
		obj: {},
		arr: object.arr
	}

	t.plan(1);

	t.deepEqual(removeNullandUndef(object), expected, 
		'Deletes null and undefined keys');
})