import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import {
	mapStyle,
	linkRedux,
	styleActiveField,
	fetchGeoJson,
} from '../map/index.js';
import { observeMap } from '../weather/index.js';

/* global google */
import store from '../redux/store.js';
import { getActive, setActive } from '../redux/active.js';
import Toolbar from '../toolbar/main.js';

const map = new google.maps.Map(document.getElementById('map-mount'), mapStyle);
const mapData = map.data;
linkRedux(mapData, store, getActive, setActive);
mapData.setStyle(styleActiveField);
observeMap(map, document.getElementById('weather-mount'));
fetchGeoJson('http://localhost:3000/api/fields/geojson', mapData);
render(
	<Toolbar />,
	document.getElementById('toolbar-mount')
);
