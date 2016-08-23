import { join } from 'path';
import __dirname from '../../dirname.js';
import search from '../find-folder.js';

const startFolder = join(__dirname, 'node_modules');
function searchModule(name) {
	return search(startFolder, `ubc-farm-${name}`, name).then(path => {
		if (path === undefined) throw new Error(`Could not find ${name}`);
		else return path;
	});
}

const method = 'GET';
const listing = true;
const index = false;

const tableBase = searchModule('table-base').then(folder => ({
	method,
	path: '/css/module/table-base/{param*}',
	handler: {
		directory: {
			listing,
			index,
			path: join(folder, 'styles'),
			defaultExtension: 'css',
		},
	},
}));

const datetime = searchModule('datetime-picker').then(folder => ({
	method,
	path: '/css/module/datetime-picker/{param*}',
	handler: {
		directory: {
			listing,
			index,
			path: join(folder, 'styles'),
			defaultExtension: 'css',
		},
	},
}));

const ports = searchModule('ports').then(folder => {
	const tape = {
		method,
		path: '/js/module/tape/{file?}',
		handler: {
			file: {
				path: join(folder, 'tape/index.js'),
				confine: false,
			},
		},
	};

	const visTimelineCss = {
		method,
		path: '/css/module/vis-timeline/{param*}',
		handler: {
			directory: {
				index,
				listing: false,
				path: join(folder, 'vis-timeline/dist'),
				defaultExtension: 'css',
			},
		},
	};

	const visTimelineJs = {
		method,
		path: `/js${visTimelineCss.path.substr('/css'.length)}`,
		handler: {
			directory: Object.assign({}, visTimelineCss.handler.directory, {
				defaultExtension: 'js',
			}),
		},
	};

	return [tape, visTimelineCss, visTimelineJs];
});

const all = Promise.all([tableBase, datetime, ports])
.then(([table, date, port]) => [table, date, ...port]);

export default all;
