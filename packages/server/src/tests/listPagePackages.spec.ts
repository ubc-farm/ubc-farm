import * as test from 'blue-tape';
import { isAbsolute } from 'path';
import { listPagePackages } from '../';

test('Contains all packages listed as optionalDependencies', async t => {
	const list = (await listPagePackages()).map(p => p.name);
	const { optionalDependencies } = require('../../package.json');

	t.deepEqual(list, Object.keys(optionalDependencies));
})

test('Returns absolute paths', async t => {
	const pageDataList = await listPagePackages();
	for (const { paths } of pageDataList) {
		for (const [key, path] of Object.entries(paths)) {
			t.assert(isAbsolute(path), `paths.${key} is an absolute path`);
		}
	}
})
