import test from 'tape';
import calendarArray from '../asarray.js';

const July2016 = new Date(2016, 6);

test('calendarArray Dimensions', t => {
	const arr = calendarArray(July2016);

	t.assert( Array.isArray(arr) && arr.every(Array.isArray) ,
		'Creates a 2D array');
	t.equal(arr.length, 6, '2D array with height of 6')
	t.assert(arr.every(a => a.length === 7), '2D array with width of 7')

	t.equal(arr[0][0], null, 'Uses null for blank spots');
	t.assert(typeof arr[0][6] === 'number', 'Uses numbers for dates');
	t.end();
})

test('calendarArray values', t => {
	t.deepEqual(calendarArray(July2016), [
		[null, null, null, null, null, 1, 2],
		[3, 4, 5, 6, 7, 8, 9],
		[10, 11, 12, 13, 14, 15, 16],
		[17, 18, 19, 20, 21, 22, 23],
		[24, 25, 26, 27, 28, 29, 30],
		[31, null, null, null, null, null, null]
	], 'Creates array corresponding to calendar');
	t.end();
})