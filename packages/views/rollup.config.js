export default {
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'dist/index.node.js', format: 'cjs' },
		{ dest: 'dist/index.es.js', format: 'es' }
	],
	external: [
		'hapi', 'vision', 'inert', 'h202', 'boom', 'joi',
		'knex', 'pg', 'objection',
		'path', 'url'
	]
};