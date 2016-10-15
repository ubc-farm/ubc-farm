import test from 'tape';
import * as fs from 'fs';
import globAll, { glob } from '../src/globAll.js';

test('Empty search', t => {
	t.plan(3);
	globAll().catch(err => t.assert(err instanceof TypeError));
	globAll([]).then()
});
