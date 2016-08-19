import test from 'tape';
import { LineString, Position } from '../';

test('Position JSON', t => {
	const pos1 = new Position({ x: 100, y: 200 });
	const pos2 = new Position({ x: 500, y: 600 });
	const line = new LineString([pos1, pos2]);

	const json = JSON.stringify(line);
	const object = JSON.parse(json);

	if (!('type' in object)) t.fail('JSON should have type property');
	if (!('coordinates' in object)) {
		t.fail('JSON should have coordinates property');
	}
	t.end();
});

test('LineString constructor', t => {
	if (typeof LineString !== 'function') {
		t.fail('LineString should export a constructor');
	}

	try {
		const someline = new LineString();
		t.fail('LineString was passed no arguments, but did not throw an error');
	} catch (e) {
		t.pass('LineString should throw an error if no arguments are passed');
	}

	const line = new LineString([]);
	t.equal(line.type, 'LineString',
		'LineString instances should have a type property "LineString"');
	t.end();
});

test('LineString from', t => {
	const line = new LineString([]);

	t.equal(LineString.from(line), line,
		'LineString.from should return the same object if it is already a LineString');
	t.end();
});
