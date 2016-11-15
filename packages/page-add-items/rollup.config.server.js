import json from 'rollup-plugin-json';

export default {
	sourceMap: true,
	entry: 'src/server/index.js',
	dest: 'dist/server.js',
	format: 'cjs',
	plugins: [json()],
	external: ['joi', 'babyparse'],
};
