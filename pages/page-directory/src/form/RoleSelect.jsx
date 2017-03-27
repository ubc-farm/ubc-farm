import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { AsyncCreatable } from 'react-select';
import db from '@ubc-farm/db/people';
import person from '@ubc-farm/db/people/uri.js';
import { startCase, snakeCase } from 'lodash';
import { withProps } from 'recompose';

const defaultRoles = ['employee', 'researcher'];

function toOption(value) {
	return { value: snakeCase(value), label: startCase(value) };
}

function getOptions(input = '') {
	const val = snakeCase(input);
	return db.allDocs({
		startkey: `person/${val}`,
		endkey: `person/${val}\uffff`,
		limit: 30,
	})
	.then(({ rows, total_rows }) => {
		const set = rows.reduce(
			(set, { _id }) => set.add(person(_id).role),
			new Set(defaultRoles),
		);

		return { options: Array.from(set, toOption) };
	})
}

export default withProps({
	name: 'role',
	loadOptions: getOptions,
	newOptionCreator: ({ label }) => toOption(label),
	isOptionUnique({ option, options }) {
		const newValue = snakeCase(option.value || option.label);
		for (const { value } of options) {
			if (newValue === value) return false;
		}

		return true;
	}
})(AsyncCreatable);
