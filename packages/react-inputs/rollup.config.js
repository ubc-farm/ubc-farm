import baseConfig from '../../rollup.config.js';

export default {
	sourceMap: true,
	moduleName: 'react_inputs',
	plugins: baseConfig.plugins,
	external: [
		'react', 'pouchdb', 'pouchdb-find', 'transform-pouch', 'moment',
	],
	globals: {
		react: 'React',
		moment: 'moment',
		pouchdb: 'PouchDB',
		lodash: '_',
	},
};
