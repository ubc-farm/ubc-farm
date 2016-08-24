/* global google */
import { map as style } from './style.js';

export default new google.maps.Map(document.getElementById('map-mount'), style);
