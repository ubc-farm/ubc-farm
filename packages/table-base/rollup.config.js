import babel from 'rollup-plugin-babel';

export default {
	entry: 'index.js',
	external: ['react'],
	plugins: [
		babel(),
	],
	sourceMap: true,
	targets: [
		// { dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' },
	],
};
