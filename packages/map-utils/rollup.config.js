export default {
	sourceMap: true,
	entry: 'src/index.js',
	targets: [
		{ dest: 'index.js', format: 'cjs' },
		// { dest: 'index.es.js', format: 'es' },
	],
	banner: '/* eslint-disable */',
};
