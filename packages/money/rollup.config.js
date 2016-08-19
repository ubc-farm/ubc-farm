export default {
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'dist/index.js', format: 'cjs' },
		{ dest: 'dist/index.es.js', format: 'es' },
	],
};
