export default function flatten(date, fidelity = 3) {
	const dateComponents = [
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds()
	].slice(0, fidelity);

	return new Date(...dateComponents);
} 