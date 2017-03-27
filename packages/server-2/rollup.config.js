import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/index.js',
	sourceMap: true,
	plugins: [
		babel({ exclude: 'node_modules/**' }),
	],
	targets: [
		{ dest: 'dist/index.es.js', format: 'es' },
		{ dest: 'dist/index.cjs.js', format: 'cjs' },
	],
};
