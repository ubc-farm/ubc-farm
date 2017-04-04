import * as moment from 'moment';
import { LongTermEntry } from '@ubc-farm/databases';

export interface LongTermData {
	data: LongTermEntry[],
}

export function getX(doc: LongTermEntry): Date {
	return moment(doc._id).toDate();
}
