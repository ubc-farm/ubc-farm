/**
 * Formats an icon src to use an svg in /assets/images/icons
 * @param {string} icon - name of icon (or bad url)
 */
exports.format = function(icon) {
	return path.format({
		dir: '/assets/images/icons',
		name: path.basename(icon, '.svg'),
		ext: '.svg'
	});
}