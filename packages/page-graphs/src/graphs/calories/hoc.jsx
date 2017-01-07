import { createElement, PropTypes, Component } from 'react';
import PouchDB from 'pouchdb';
import DataComponent from '../DataComponent.js';
import Chart from './Chart.jsx';
/** @jsx createElement */

const cropDB = new PouchDB('crops');
const plantDB = new PouchDB('plants');

/**
 * Higher Order Component that wraps the given component so that it receives
 * data from the long-term database. Its data will represent a given year.
 * @param {React.Component} component
 * @returns {React.Component}
 */
export default function hoc(component) {
	return class CaloriesComponent extends DataComponent {
		async loadData() {
			const crops = await cropDB.allDocs({ include_docs: true });
			const amounts = crops.rows.reduce((map, { variety, quantity }) => {
				const i = map.get(variety) || 0;
				return map.set(variety, i + quantity);
			}, new Map());

			const plants = await plantDB.allDocs({
				keys: Array.from(data.keys()),
				include_docs: true,
			});

			return plantDB.rows
				.map(({ _id, calories, name }) => ({
					name,
					calories: calories * amounts.get(_id),
				}))
				.sort((a, b) => a.calories - b.calories);
		}

		render() { return createElement(component, this.state); }
	}
}
