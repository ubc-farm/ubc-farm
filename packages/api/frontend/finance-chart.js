/**
 * Creates two divs to be used as bar chart bars,
 * with widths as percentages of the chart width
 * @param {number} revenue - first bar's value
 * @param {number} expense - second bar's value
 * @param {number} max - max value of the bars (used to turn value into percent)
 * @returns {DocumentFragment}
 */
function addRevExpBars(revenue, expense, max) {
	var revPercent = revenue/max, expPercent = expense/max;
	
	var revBar = document.createElement("div");
	revBar.className = 'finance-bar rev-bar';
	revBar.style.width = 'calc(' + revPercent + ' * 100%)';
	
	var expBar = document.createElement('div');
	expBar.className = 'finance-bar exp-bar';
	expBar.style.width = 'calc(' + expPercent + ' * 100%)';
	
	var frag = document.createDocumentFragment();
	frag.appendChild(revBar);
	frag.appendChild(expBar);
	return frag;
}

domReady.then(function() {
	rows = document.getElementsByClassName('finance-row');
})