import Resolver from "@forge/resolver";
import { scheduleService } from "../services";

/**
 * @param {Resolver} resolver
 */
function scheduleResolver(resolver) {
	resolver.define("getThreadSchedule", async function (req) {
		try {
			let response = await scheduleService.getThreadSchedule(req.payload.parameterId);
			return response;
		} catch (error) {
			console.log("Error in schedule: ", error);
			throw new Error(JSON.stringify(error));

		}
	});

	resolver.define("schedule", async function (req) {
		try {
			let response = await scheduleService.schedule(req.payload.threadId);
			return response;
		} catch (error) {
			console.log("Error in schedule: ", error);
			throw new Error(JSON.stringify(error));

		}
	});

	resolver.define("saveSolution", async function (req) {
		try {
			let response = await scheduleService.saveSolution(req.payload.solutionReq);
			return response;
		} catch (error) {
			console.log("Error in saveSolution: ", error);
			throw new Error(JSON.stringify(error));

		}
	});

	resolver.define("getSolutionsByProject", async function (req) {
		try {
			let response = await scheduleService.getSolutionsByProject(req.payload.projectId);
			return response;
		} catch (error) {
			console.log("Error in getSolutionsByProject: ", error);
			throw new Error(JSON.stringify(error));

		}
	});

	resolver.define("getSchedule", async function (req) {
		try {
			let response = await scheduleService.getSchedule(req.payload.scheduleId);
			return response;
		} catch (error) {
			console.log("Error in getSchedule: ", error);
			throw new Error(JSON.stringify(error));

		}
	});

	resolver.define("deleteSchedule", async function (req) {
		try {               
			return await scheduleService.deleteSchedule(req.payload.scheduleId);
		} catch (error) {
			console.log("Error in deleteSchedule: ", error);
			throw new Error(JSON.stringify(error));

		}
	});

	resolver.define("editSchedule", async function (req) {
		try {
			let response = await scheduleService.editSchedule(req.payload.schedule);
			return response;
		} catch (error) {
			console.log("Error in editSchedule: ", error);
			throw new Error(JSON.stringify(error));

		}
	});
}

export default scheduleResolver;
