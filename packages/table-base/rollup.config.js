import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/index.js',
	external: ['react'],
	plugins: [
		babel(),
	],
	sourceMap: true,
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' },
		{ dest: 'index.iife.js', format: 'iife' },
	],
};
