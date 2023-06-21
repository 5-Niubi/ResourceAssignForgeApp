import moment from "moment";

/**
 * Using moment.js to get current date into format "YYYY-MM-DD"
 * @returns {string} currentDate
 */
export function getCurrentTime() {
	let date = moment();
	let currentDate = date.format("YYYY-MM-DD");
	return currentDate;
}

export function formatDateDMY(date){
	return moment(date).format("DD-MM-YYYY");
}
