import Resolver from "@forge/resolver";
import { taskService } from "../services";

/**
 * @param {Resolver} resolver
 */
function taskResolver(resolver) {
	resolver.define("getTasksList", async function (req) {
		try {
			return await taskService.getTasks(req.payload.projectId);
		} catch (error) {
			console.log("Error in getTasksList: ", error);
			return Promise.reject(error);
		}
	});

	resolver.define("createNewTask", async function (req) {
		try {
			let response = await taskService.createTask(req.payload.taskObjRequest);
			console.log(response);
			return response;
		} catch (error) {
			console.log("Error in createNewTask: ", error);
			return Promise.reject(error);
		}
	});

	resolver.define("getTaskDetail", async function (req) {
		try {
			let response = await taskService.getTask(req.payload.taskId);
			console.log(response);
			return response;
		} catch (error) {
			console.log("Error in getTaskDetail: ", error);
			return Promise.reject(error);
		}
	});
}

export default taskResolver;