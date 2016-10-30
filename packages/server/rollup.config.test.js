import config from './rollup.config.js';

export default {
	plugins: [...config.plugins],
	format: 'cjs',
	external: [...config.external, 'object.values/polyfill', 'blue-tape'],
};
