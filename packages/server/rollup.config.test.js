import config from './rollup.config.js';

export default {
	entry: 'test/importPlugin.spec.js',
	plugins: [...config.plugins],
	format: 'cjs',
	external: [...config.external, 'blue-tape'],
};
