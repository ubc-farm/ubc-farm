import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
	sourceMap: true,
	entry: 'server/src/index.js',
	dest: 'server/out/index.js',
	format: 'cjs',
	plugins: [
		json(),
		babel(),
	],
	external: ['joi', 'babyparse'],
};
