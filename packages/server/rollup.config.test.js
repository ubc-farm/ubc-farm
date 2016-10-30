import config from './rollup.config.js';

export default {
	plugins: [...config.plugins],
	format: 'cjs',
	external: [...config.external, 'blue-tape'],
};
