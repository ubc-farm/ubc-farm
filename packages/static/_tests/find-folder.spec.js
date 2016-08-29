import { resolve } from 'path';
import test from 'tape';
import search from '../server/find-folder.js';

test('Resolves', t => {
	t.plan(1);

	search(__dirname, 'rollup.config.js')
		.then(data => t.pass(`Resolved with ${data}`))
		.catch(err => t.fail(`Threw with ${err}`));
});

test('Searches each parent directory until file is found', t => {
	t.plan(1);

	search(__dirname, 'server-static/_tests/find-folder.spec.js')
		.then(path => {
			t.equal(path, resolve(__dirname, '../server-static/_tests/find-folder.spec.js'));
		})
		.catch(err => t.fail(`Threw with ${err}`));
});

test('Resolved with undefined when the path can\'t be found', t => {
	t.plan(1);

	search(__dirname, 'fake-folder-with/fake-sub-file.fakeextssssss')
		.then(path => {
			t.equal(path, undefined);
		})
		.catch(err => t.fail(`Threw with ${err}`));
});

test('Works with multiple potential names', t => {
	t.plan(1);

	search(__dirname,
		'fake-folder-with/fake-sub-file.fakeextssssss',
		'foo-bar/hello-world.nonexistentfile',
		'server-static/_tests/find-folder.spec.js'
	)
		.then(path => {
			t.equal(path, resolve(__dirname, '../server-static/_tests/find-folder.spec.js'));
		})
		.catch(err => t.fail(`Threw with ${err}`));
});
