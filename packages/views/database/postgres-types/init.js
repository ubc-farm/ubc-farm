import {types} from 'pg';
import {oid as PG} from './oid.js';

import {point, path, circle} from './parse/geometric.js';
import {timestamp, time, interval} from './parse/datetime.js';

export default function init() {
	types.setTypeParser(PG.point, point);
	types.setTypeParser(PG.lseg, path);
	types.setTypeParser(PG.box, path);
	types.setTypeParser(PG.path, path);
	types.setTypeParser(PG.polygon, polygon);
	types.setTypeParser(PG.circle, circle);

	types.setTypeParser(PG.timestamp, timestamp);
	types.setTypeParser(PG.timestamptz, timestamp);
	types.setTypeParser(PG.date, timestamp);
	types.setTypeParser(PG.time, time);
	types.setTypeParser(PG.timetz, time);
	types.setTypeParser(PG.interval, interval);
}