import test from 'tape';
import {diff, REMOVED} from '../'

const store = {
	path: 'some/path',
	messages: ['hi'],
	data: {
		'sda2q3q': {
			file: 'hello.world'
		},
		'dsadd2': {
			file: 'foo.bar'
		}
	},
	undef: undefined
}

const clone = newVal => Object.assign({}, store, newVal);

test('diff primitives', t => {
	t.equal(diff('foo', 'foo'), undefined, 
		'Returns undefined for equal primitives')
	t.equal(diff('foo', 'bar'), 'bar', 'Returns the newer store');
	t.equal(diff(null, 'hello'), 'hello', 'Works with type changes');
	t.end();
})

test('diff arrays', t => {
	t.equal(diff(store.messages, store.messages), undefined, 
		'Returns undefined for identical arrays')
	t.equal(diff(store.messages, clone().messages), undefined,
		'Returns undefined for identical arrays from different objects');
	
	t.deepEqual(diff(store.messages, ['hi', 'earth']), [undefined, 'earth'],
		'Returns array containing new values');
	
	t.deepEqual(diff(store.messages, []), [REMOVED],
		'Marks removed items as with REMOVED symbol')
	
	const longArray = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
	const smallerArray = ['ipsum', 'sit'];
	t.deepEqual(diff(longArray, smallerArray), 
		[REMOVED, undefined, REMOVED, undefined, REMOVED],
		'Marks multiple removed items in the position they were removed from');
	
	const differentArray = ['ipsum', 'sit', 'bacon']
	t.deepEqual(diff(longArray, differentArray), 
		[REMOVED, undefined, REMOVED, undefined, REMOVED, 'bacon'],
		'Removes old symbols and appends new symbols at the end');
	t.end();
})

test('diff objects', t => {
	const blank = {};
	t.equal(diff(blank, blank), undefined, 
		'Returns undefined for identical objects')
	t.equal(diff(store.data, clone().data), undefined,
		'Returns undefined for identical objects from different sources');

	const changePath = clone({path: 'new/location'})
	t.deepEqual(diff(store, changePath), {path: 'new/location'},
		'Returns object containing new values');
	
	let removedProp = clone();
	delete removedProp.messages;
	t.deepEqual(diff(store, removedProp), {messages: REMOVED},
		'Marks removed properties with REMOVED symbol')
	
	let nestedData = Object.assign({}, store.data);
	delete nestedData['sda2q3q'];
	const removedNested = clone({
		data: nestedData
	})
	t.deepEqual(diff(store, removedNested), 
		{data: {'sda2q3q': REMOVED}},
		'Marks nested removed items in their tree position');
	
	const copy = clone();
	copy.data = Object.assign({}, copy.data, {
		'dsader3': {
			file: 'bat.box'
		}
	});
	t.deepEqual(diff(store, copy), 
		{data: {'dsader3': {file: 'bat.box'}}},
		'Appends nested items to their new tree position');
	t.end();
})