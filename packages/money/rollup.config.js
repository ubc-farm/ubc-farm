export default {
	entry: 'src/index.js',
	sourceMap: true,
	targets: [
		{ dest: 'dist/index.cjs.js', format: 'cjs' },
		{ dest: 'dist/index.es.js', format: 'es' },
	],
	banner: '/* eslint-disable */',
};
