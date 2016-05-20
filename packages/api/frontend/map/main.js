/** @namespace farm.map */
farm.map = farm.map || {};

/**
 * Initializes a map at the specified node
 * @param {string|Element} node - element, or an element's id
 * @returns {google.maps.Map}
 */
farm.map.init = function(node) {
	if (typeof node == "string") node = document.getElementById(node);
	return new google.maps.Map(node, {
		center: {lat: 49.249568, lng: -123.237155},
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.SATELLITE
	})
}