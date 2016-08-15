import test from 'tape';
import {id} from '../'

test('Unique ID generation', t => {
	let generated = []; let failed = false;
	for (let i = 0; i < 100; i++) {
		const newId = id();
		if (generated.indexOf(newId) > 0) {
			t.fail(i + ': Generated non-unique id ' + newId);
			failed = true;
			break;
		}
		generated.push(newId);
	}
	if (!failed) 
		t.pass('Created 100 unique ids')
	t.end();
})