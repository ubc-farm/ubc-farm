/* eslint-disable import/no-commonjs */

exports.register = function pluginStub(server, options, next) {
	server.route({
		method: 'GET',
		path: '/test',
		handler(request, reply) {
			reply('test passed');
		},
	});

	next();
};

exports.register.attributes = {
	name: 'pluginStub',
	version: '0.0.1',
};
