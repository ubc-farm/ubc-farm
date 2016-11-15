import multiEntry from 'rollup-plugin-multi-entry';

export default {
	entry: 'test/*.js',
	format: 'cjs',
	plugins: [multiEntry()],
	external: ['tap', 'tape'],
	paths: { '../src/index.js': './dist/index.cjs.js' },
};
