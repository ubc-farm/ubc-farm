export default {
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	],
	external: [
		'hapi', 'inert',
		'path', 'tape'
	]
};