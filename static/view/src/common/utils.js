import { invoke } from "@forge/bridge";
import moment from "moment";
import { STORAGE } from "./contants";
import { colorsBank } from "./colors";

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

export function cache(key, val) {
	localStorage.setItem(key, val);
}

export function getCache(key) {
	return localStorage.getItem(key);
}

export function clearCache(key) {
	localStorage.removeItem(key);
}

export function clearAllCache(){
	localStorage.clear();
}

/**
 * @desc Get a specific object in the array by its id
 * @param {Array} arr 
 * @param {*} id 
 * @returns Object | null
 */
export function findObj(arr, id){
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].id == id){
			return arr[i];
		}
	}
	return null;
}

/**
 * @desc Get a color in a bank by its index. In case index is exceeded the bank, 
 * the function will return the color at the index calculated by module of the original index and array length
 * @param {Int} index 
 * @param {Array} bank - array of color; default is colorsBank array
 * @returns Color in array
 */
export function getColor(index, bank = colorsBank){
	return bank[index % bank.length];
}
