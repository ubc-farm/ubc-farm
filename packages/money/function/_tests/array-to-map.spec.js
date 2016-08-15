import test from 'tape';
import {arrayToMap, arrayToObjectMap, mapToObject} from '../'

const array = [
	{
		id: 1,
		value: 'hello',
		text: 'world'
	},
	{
		id: 'ds2133214',
		key: 'john',
		john: 'smith'
	}			
]

test('arrayToMap', t => {
	const map = arrayToMap(array, 'id');
	t.assert(map instanceof Map, 'should return a Map');

	const keys = [...map.keys()];
	const values = [...map.values()];

	t.deepLooseEqual(keys, [1, 'ds2133214'], 
		'keys should correspond to the values of the "id" property');

	t.equal(keys[0], 1, 'should allow for non-string keys');
	t.deepEqual(values[0], array[0], 
		'values should be equivalent to the original objects in the array');
	t.end();
})

test('arrayToObjectMap', t => {
	const object = arrayToObjectMap(array, 'id');
	const keys = Object.keys(object);

	t.deepEqual(keys, ['1', 'ds2133214'],
		'keys should correspond to the values of the "id" property');
	t.equal(keys[0], '1', 'non-string keys should be converted into strings');
	t.deepEqual(object[keys[0]], array[0],
		'values should be equivalent to the original objects in the array');
	t.end();
})

test('mapToObject', t => {
	const map = arrayToMap(array, 'id'), object = mapToObject(map);
	
	t.deepEqual(map.get('ds2133214'), object.ds2133214,
		'values are the same in the map and object')
	t.equal(object['1'], undefined,
		'non-string keys are ignored')

	t.end();
})