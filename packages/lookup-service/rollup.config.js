export default {
	entry: 'src/lookupItem.js',
	sourceMap: true,
	targets: [
		{ dest: 'dist/index.cjs.js', format: 'cjs' },
		{ dest: 'dist/index.es.js', format: 'es' },
	],
	exports: 'named',
	external(id) {
		return !id.includes('/');
	},
}
