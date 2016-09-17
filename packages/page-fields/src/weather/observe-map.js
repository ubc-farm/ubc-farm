/* global google */
import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';

import WeatherDisplay from './display.js';

function renderWeather(pos, target) {
	render(
		<WeatherDisplay lat={pos.lat()} lng={pos.lng()} delay={5000} />,
		target
	);
}

/**
 * Attaches the weather component to the given Google Map,
 * and updates itself when the map moves so the weather reflects
 * the current focus of the map.
 * @param {google.maps.Map} map
 * @param {Element} element on document to place map
 * @returns {function} call to remove listener
 */
export default function updateWeatherOnMapPan(map, element) {
	renderWeather(map.getCenter(), element);

	const listener = google.maps.event.addListener(map, 'center_changed',
		() => renderWeather(map.getCenter(), element)
	);

	return () => listener.remove();
}
