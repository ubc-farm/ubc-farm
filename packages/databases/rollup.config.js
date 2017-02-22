import baseConfig from '../../rollup.config.js';

const [nodeResolve, commonjs, json,, typescript] = baseConfig.plugins;

export default {
	sourceMap: true,
	moduleName: 'databases',
	plugins: [
		nodeResolve,
		commonjs,
		json,
		typescript,
	],
	external: [
		'react', 'pouchdb', 'pouchdb-find', 'transform-pouch', 'moment', 'lodash',
	],
	globals: {
		react: 'React',
		moment: 'moment',
		pouchdb: 'PouchDB',
		lodash: '_',
	},
};
