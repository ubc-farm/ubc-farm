import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: 'src/index.js',
	external: ['react'],
	globals: { react: 'React' },
	plugins: [
		babel({ include: 'src/**', exclude: 'node_modules/**' }),
		nodeResolve(),
	],
	sourceMap: true,
	targets: [
		{ dest: 'dist/index.node.js', format: 'cjs' },
		{ dest: 'dist/index.es.js', format: 'es' },
	],
	banner: '/* eslint-disable */',
};
