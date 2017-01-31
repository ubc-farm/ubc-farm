import { arrayToMap, arrayToObjectMap, mapToObject } from '../';

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
	},
];

test('arrayToMap', () => {
	const map = arrayToMap(array, 'id');
	expect(map).toBeInstanceOf(Map);

	const keys = [...map.keys()];
	const values = [...map.values()];

	expect(keys).toEqual([1, 'ds2133214']);
	expect(keys[0]).toBe(1);
	expect(values[0]).toEqual(array[0]);
});

test('arrayToObjectMap', () => {
	const object = arrayToObjectMap(array, 'id');
	const keys = Object.keys(object);

	expect(keys).toEqual(['1', 'ds2133214']);
	expect(keys[0]).toBe('1');
	expect(object[keys[0]]).toEqual(array[0]);
});

test('mapToObject', () => {
	const map = arrayToMap(array, 'id');
	const object = mapToObject(map);

	expect(map.get('ds2133214')).toEqual(object.ds2133214);

	expect(object['1']).toBeUndefined();
});
