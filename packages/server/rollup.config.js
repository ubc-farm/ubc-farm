import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: 'src/index.js',
	sourceMap: true,
	external: [
		'fs',
		'path',
		'glob',
		'hapi',
		'inert',
		'vision',
		'handlebars',
	],
	plugins: [
		babel({ exclude: 'node_modules/**' }),
		commonjs(),
		nodeResolve(),
	],
	targets: [
		{ dest: 'dist/index.es.js', format: 'es' },
		{ dest: 'dist/index.cjs.js', format: 'cjs' },
	],
};
