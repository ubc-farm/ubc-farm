import test from 'tape';
import Position from '../position.js'

test('Position iterator and JSON', t => {
	const arrayPos = new Position([100, 200, 300]);
	const objectPos = new Position({x: 100, y: 200});

	if (!Symbol.iterator in arrayPos) t.fail('position should have an iterator')

	t.deepEqual([...arrayPos], [100, 200, 300],
		`values from position's iterator should be equal to the array passed into its constrctor`);
	
	t.deepEqual([...objectPos], [100, 200],
		`positions created from objects should have an interator that returns the same values as the object's [x, y]`);

	t.equal(JSON.stringify(arrayPos), JSON.stringify([100, 200, 300]),
		'JSON.stringify should turn positions into an array')
	t.end();
})

test('Position constructor', t => {
	if (!typeof Position === 'function') 
		t.fail('Position should export a constructor')

	try {
		new Position();
		t.fail('Position was passed no arguments, but did not throw an error')
	} catch (e) {
		t.pass('Position should throw an error if no arguments are passed')
	}
	t.end();
})

test('Position aliases', t => {
	const arrayPos = new Position([100, 200, 300]);
	const objectPos = new Position({x: 100, y: 200});

	t.equal(arrayPos[0], arrayPos.x, 
		'position.x should be an alias for position[0]');
	t.equal(arrayPos[0], arrayPos.lng, 
		'position.lng should be an alias for position[0]');

	t.equal(arrayPos[1], arrayPos.y, 
		'position.y should be an alias for position[1]');
	t.equal(arrayPos[1], arrayPos.lat, 
		'position.lat should be an alias for position[1]');

	t.equal(objectPos[0], 100, 
		`the x property in the position's constructor should be set as position[0]`)
	t.equal(objectPos[1], 200, 
		`the y property in the position's constructor should be set as position[y]`)
	t.end();
})