module.exports = {
	development: {
		client: 'sqlite',
		connection: { filename: './fieldDB.sqlite' },
		debug: true,
	},
	production: {

	},
	test: {
		client: 'sqlite',
		connection: { filename: ':memory:' },
	},
};
