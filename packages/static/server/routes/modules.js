import {join} from 'path';
import __dirname from '../../dirname.js'
import search from '../find-folder.js';

const folder = join(__dirname, 'node_modules');
function searchModule(name) {
	return search(folder, `ubc-farm-${name}`, name).then(path => {
		if (path === undefined) throw new Error(`Could not find ${name}`);
		else return path;
	})
}

const method = 'GET', listing = true, index = false;

const tableBase = searchModule('table-base').then(folder => ({
	method, path: '/css/module/table-base/{param*}',
	handler: {
		directory: {
			path: join(folder, 'styles'),
			listing, index,
			defaultExtension: 'css'
		}
	}
}))

const datetime = searchModule('datetime-picker').then(folder => ({
	method, path: '/css/module/datetime-picker/{param*}',
	handler: {
		directory: {
			path: join(folder, 'styles'),
			listing, index,
			defaultExtension: 'css'
		}
	}
}))

const ports = searchModule('ports').then(folder => {
	const tape = {
		method, path: '/js/module/tape/{file?}',
		handler: {
			file: {
				path: join(folder, 'tape/index.js'),
				confine: false
			}
		}
	};

	const visTimelineCss = {
		method, path: '/css/module/vis-timeline/{param*}',
		handler: {
			directory: {
				path: join(folder, 'vis-timeline/dist'),
				index, listing: false,
				defaultExtension: 'css'
			}
		}
	}

	const visTimelineJs = {
		method,
		path: '/js' + visTimelineCss.path.substr('/css'.length),
		handler: {
			directory: Object.assign({}, visTimelineCss.handler.directory, {
				defaultExtension: 'js'
			})
		}
	}

	return [tape, visTimelineCss, visTimelineJs];
})

const all = Promise.all([tableBase, datetime, ports])
.then(([table, date, port]) => [table, date, ...port]);

export default all;