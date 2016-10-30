import babel from 'rollup-plugin-babel';

export default {
	entry: 'bin/src/index.js',
	dest: 'bin/ubc-farm-server.js',
	format: 'cjs',
	banner: '#! /usr/bin/env node',
	sourceMap: true,
	external: ['minimist', 'ubc-farm-server'],
	plugins: [babel()],
	paths: { 'ubc-farm-server': '../dist/index.cjs.js' },
};
