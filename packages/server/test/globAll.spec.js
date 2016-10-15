import test from 'blue-tape';
import globAll, { glob } from '../src/globAll.js';

test('Empty search', async t => {
	t.shouldFail(globAll(), TypeError);
	t.deepEqual(await globAll([]), []);
	t.deepEqual(await globAll([,,]), []);
});

test('Single pattern search', async t => {
	t.deepEqual(await globAll(['../*']), await glob('../*'));
	t.deepEqual(await globAll(['../*/']), await glob('../*/'));
	t.deepEqual(await globAll(['../*/*/']), await glob('../*/*/'));
});

test('Multiple pattern search', async t => {
	const expectedGroup = await Promise.all([glob('../test/*'), glob('../src/*')]);

	t.deepEqual(
		await globAll(['../test/*', '../src/*']),
		expectedGroup[0].concat(expectedGroup[1])
	);
});
