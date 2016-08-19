import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: 'index.js',
	external: ['react'],
	plugins: [
		babel({
			plugins: ['transform-react-jsx', 'external-helpers'],
		}),
		nodeResolve({ jsnext: true }),
	],
	sourceMap: true,
	targets: [
		// { dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' },
	],
};
