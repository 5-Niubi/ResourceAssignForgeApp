import Resolver from "@forge/resolver";
import { scheduleService } from "../services";

/**
 * @param {Resolver} resolver
 */
function scheduleResolver(resolver) {
	resolver.define("getThreadSchedule", async function (req) {
		try {
			let response = await scheduleService.getThreadSchedule(req.payload.parameterId);
			console.log(response);
			return response;
		} catch (error) {
			console.log("Error in schedule: ", error);
			return Promise.reject(error);
		}
	});

	resolver.define("schedule", async function (req) {
		try {
			let response = await scheduleService.schedule(req.payload.threadId);
			console.log(response);
			return response;
		} catch (error) {
			console.log("Error in schedule: ", error);
			return Promise.reject(error);
		}
	});
}

export default scheduleResolver;
