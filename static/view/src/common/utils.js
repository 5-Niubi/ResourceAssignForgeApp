import { invoke } from "@forge/bridge";
import moment from "moment";
import { STORAGE } from "./contants";

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
		localStorage.setItem(STORAGE.THREAD_INFO, JSON.stringify(threadInfo));
	} catch (error) {
		Promise.reject(error);
	}
}

export async function removeThreadInfo(threadId) {
	try {
		await invoke("removeThreadInfo", { threadId });
		localStorage.removeItem(STORAGE.THREAD_INFO);
	} catch (error) {
		Promise.reject(error);
	}
}

export function calculateDuration({ startDate, endDate }) {
	var a = moment(startDate);
	var b = moment(endDate);
	return b.diff(a, "days");
}

export function extractProjectKey(str) {
	return str.replace(/[^A-Z0-9]+/g, "");
}
