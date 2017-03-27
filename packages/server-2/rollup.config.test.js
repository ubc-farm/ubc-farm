import config from './rollup.config.js';

export default {
	plugins: [...config.plugins],
	format: 'cjs',
	external: ['blue-tape'],
};
