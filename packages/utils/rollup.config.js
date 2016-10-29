export default {
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'dist/index.cjs.js', format: 'cjs' },
		{ dest: 'dist/index.es.js', format: 'es' },
	],
};
