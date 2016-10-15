import multiEntry from 'rollup-plugin-multi-entry';
import config from './rollup.config.js';

export default {
	entry: 'test/**',
	plugins: [...config.plugins, multiEntry({ exports: false })],
	format: 'cjs',
	external: [...config.external, 'tape'],
};
