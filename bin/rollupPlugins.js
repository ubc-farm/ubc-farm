/* eslint-disable strict,import/no-extraneous-dependencies */

'use strict';

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const nodeResolve = require('rollup-plugin-node-resolve');
const nodeGlobals = require('rollup-plugin-node-globals');
const rollupTs = require('rollup-plugin-typescript');
const typescript = require('typescript');

module.exports = function rollupPlugins(nodeResolveConfig) {
	return [
		nodeResolve(Object.assign(
			{ jsnext: true, extensions: ['.js', '.jsx', '.ts', '.tsx'] },
			nodeResolveConfig
		)),
		commonjs({
			namedExports: {
				shortid: ['generate'],
				docuri: ['route'],
				events: ['EventEmitter'],
				'core-js/library/modules/es6.object.to.string.js': ['default'],
			},
		}),json(),
		nodeGlobals(),
		rollupTs({
			tsconfig: false,
			typescript,
			allowJs: true,
			strictNullChecks: true,
			jsx: 'React',
		}),
		babel({ exclude: 'node_modules/**', include: 'src/**/*.jsx' }),
	];
};
