/* global google */
import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';

import WeatherDisplay from './display.js';

/** DIV to mount to */
const target = document.getElementById('weather-mount');

/**
 * Gets the center position of the given map
 * @returns {Object}
 */
const centerPos = map => map.getCenter().toJSON();

function renderWeather(position) {
	render(
		<WeatherDisplay {...position} delay={5000} />,
		target
	);
}

/**
 * Attaches the weather component to the given Google Map,
 * and updates itself when the map moves so the weather reflects
 * the current focus of the map.
 * @param {google.maps.Map} map
 * @returns {google.maps.event.listener} listener object
 */
export default function attachWeatherToMap(map) {
	renderWeather(centerPos(map));
	return google.maps.event.addListener(map, 'center_changed',
		() => renderWeather(centerPos(map))
	);
}
