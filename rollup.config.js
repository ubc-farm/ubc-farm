import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

const globals = {
	react: 'React',
	'react-dom': 'ReactDOM',
};

/**
 * Default browser rollup config.
 */
export default {
	sourceMap: true,
	format: 'iife',
	plugins: [
		babel({ exclude: 'node_modules/**', include: 'src/**/*.jsx' }),
		nodeResolve({ browser: true, preferBuiltins: false }),
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.browser': JSON.stringify(true),
		}),
		commonjs({
			namedExports: {
				shortid: ['generate'],
				docuri: ['route'],
			},
		}),
		json(),
	],
	globals,
	external: Object.keys(globals),
};
