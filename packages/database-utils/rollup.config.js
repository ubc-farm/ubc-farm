export default {
	entry: 'src/index.js',
	sourceMap: true,
	targets: [
		{ dest: 'out/index.cjs.js', format: 'cjs' },
		{ dest: 'out/index.es.js', format: 'es' },
	],
	external: [
		'react',
	],
	banner: '/* eslint-disable */',
};
