function formatDate(date) {
	if (!(date instanceof Date)) return `Error`;

	let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	let day        = date.getDate();
	let monthIndex = date.getMonth();
	let year       = date.getFullYear();

	return `${monthNames[monthIndex]} ${day}, ${year}`;
}

function secondsToHms(d) {
	d = Number(d);
	let h = Math.floor(d / 3600);
	let m = Math.floor(d % 3600 / 60);
	let s = Math.floor(d % 3600 % 60);
	return `${h}:${m}:${s}`;
}

module.exports = {
	formatDate,
	secondsToHms
};