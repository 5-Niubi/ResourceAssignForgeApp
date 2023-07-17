import { invoke } from "@forge/bridge";
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

export function formatDateDMY(date) {
	return moment(date).format("DD-MM-YYYY");
}

export async function saveThreadInfo(threadInfo) {
	try {
		await invoke("setThreadInfo", { threadInfo });
		localStorage.setItem("thread_info", JSON.stringify(threadInfo));
	} catch (error) {
		Promise.reject(error);
	}
}

export async function removeThreadInfo(threadId) {
	try {
		await invoke("removeThreadInfo", { threadId });
		localStorage.removeItem("thread_info");
	} catch (error) {
		Promise.reject(error);
	}
}
