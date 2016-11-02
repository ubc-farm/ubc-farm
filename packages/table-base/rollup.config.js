import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: 'src/index.js',
	external: ['react'],
	globals: { react: 'React' },
	plugins: [
		babel({ exclude: 'node_modules/**' }),
		commonjs(),
		nodeResolve(),
	],
	sourceMap: true,
	moduleName: 'UBCFarmTable',
	targets: [
		{ dest: 'dist/index.node.js', format: 'cjs' },
		{ dest: 'dist/index.es.js', format: 'es' },
		{ dest: 'dist/index.iife.js', format: 'iife' },
	],
};
