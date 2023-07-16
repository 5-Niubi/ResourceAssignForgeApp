import { storage } from "@forge/api";
import { STORAGE } from "../common/constants";
import APIServices from "./common/APIServices";

async function addThreadState(threadInfo) {
	try {
		let state = [];
		state = await storage.get(STORAGE.THEAD_STATE);
		if(!state){
			state = [];
		}
		state.push(threadInfo);
		await storage.set(STORAGE.THEAD_STATE, state);
	} catch (error) {
		return Promise.reject(error);
	}
}

async function getThreadState() {
	try {
		let state = [];
		state = await storage.get(STORAGE.THEAD_STATE);
		if(state || state.length === 0){
			Promise.reject("Thread Queue Empty!");
		}
		return state;
	} catch (error) {
		return Promise.reject(error);
	}
}

async function removeThreadState(threadId) {
	try {
		let state = [];

		state = await storage.get(STORAGE.THEAD_STATE);
		state = state.filter(function (threadState) {
			return threadState.threadId !== threadId;
		});
		await storage.set(STORAGE.THEAD_STATE, state);
	} catch (error) {
		return Promise.reject(error);
	}
}

async function getThreadResult(threadId) {
	try {
		return await APIServices.get("/api/Thread/GetThreadResult", { threadId });
	} catch (error) {
		return Promise.reject(error);
	}
}

export { addThreadState, getThreadState, removeThreadState, getThreadResult };
