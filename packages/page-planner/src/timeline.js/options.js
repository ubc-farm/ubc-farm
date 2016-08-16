const lastYear = new Date(new Date().getFullYear() - 1, 0);
const nextYear = new Date(new Date().getFullYear() + 2, 0, 0);

export default {
	editable: true,
	min: lastYear, max: nextYear
}