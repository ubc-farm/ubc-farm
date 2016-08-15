export default {
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'dist/index.node.js', format: 'cjs' },
		{ dest: 'dist/index.es.js', format: 'es' }
	],
	external: [
		'hapi', 'inert',
		'path'
	]
};