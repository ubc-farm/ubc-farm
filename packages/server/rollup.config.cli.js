import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: 'bin/src/index.js',
	dest: 'bin/ubc-farm-server.js',
	format: 'cjs',
	banner: '#! /usr/bin/env node',
	sourceMap: true,
	external: ['ubc-farm-server'],
	paths: { 'ubc-farm-server': '../dist/index.cjs.js' },
	plugins: [
		babel({ exclude: 'node_modules/**' }),
		commonjs(),
		nodeResolve(),
	],
};
