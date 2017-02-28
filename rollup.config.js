import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import nodeGlobals from 'rollup-plugin-node-globals';
import rollupTs from 'rollup-plugin-typescript';
import typescript from 'typescript';

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
		nodeResolve({
			browser: true,
			preferBuiltins: false,
			jsnext: true,
			extensions: ['.js', '.ts', '.tsx'],
		}),
		commonjs({
			namedExports: {
				shortid: ['generate'],
				docuri: ['route'],
				events: ['EventEmitter'],
				'core-js/library/modules/es6.object.to.string.js': ['default'],
				'react-dom': ['findDOMNode'],
			},
		}),
		json(),
		nodeGlobals(),
		rollupTs({
			typescript,
			allowJs: true,
			strictNullChecks: true,
			jsx: 'React',
		}),
		babel({ exclude: 'node_modules/**', include: 'src/**/*.jsx' }),
	],
	globals,
	external: Object.keys(globals),
};
