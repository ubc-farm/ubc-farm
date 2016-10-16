import test from 'blue-tape';
import { Server } from 'hapi';
import importPlugin, { ConfigError } from '../src/importPlugin.js';

const pluginStub = require('./test/fixture/plugin.js');

test('server.register stub', t => {
	t.plan(1);
	const serverStub = {
		register(plugin) { t.equal(plugin, pluginStub); },
	};

	importPlugin(serverStub, 'test/fixture');
});

test('Adds `once: true` to options if not present', t => {
	t.plan(2);
	const serverStub1 = {
		register(p, options) {
			t.deepEqual(options, { once: true, foo: 'bar' });
		},
	};
	const serverStub2 = {
		register(p, options) {
			t.deepEqual(options, { once: false });
		},
	};

	importPlugin(serverStub1, 'test/fixture', { foo: 'bar' });
	importPlugin(serverStub2, 'test/fixture', { once: false });
});

test('Throws errors', t => {
	t.plan(3);
	t.shouldFail(importPlugin(), TypeError, 'Reject TypeError when server is missing');
	t.shouldFail(importPlugin({}, process.cwd()), ConfigError);
	t.shouldFail(importPlugin({}, 'test'), 'Reject when package.json doesn\'t exist');
});

test('Imported plugin is registered propertly', async t => {
	const server = new Server();
	server.connection();
	await importPlugin(server, 'test/fixture');

	const { payload } = await server.inject('/test');
	t.equal(payload, 'test passed');
});
