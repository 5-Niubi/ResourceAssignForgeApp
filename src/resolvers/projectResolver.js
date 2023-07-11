import Resolver from "@forge/resolver";
import { projectService } from "../services";

/**
 * @param {Resolver} resolver
 */
function projectResolver(resolver) {
	resolver.define("getProjectsList", async function (req) {
		try {
			return await projectService.getProjects(req.payload.page);
		} catch (error) {
			console.log("Error in getProjectsList: ", error);
			return Promise.reject(error);
		}
	});

	resolver.define("createNewProjectProjectLists", async function (req) {
		try {
			let response = await projectService.createProject(req.payload.projectObjRequest);
			console.log(response);
			return response;
		} catch (error) {
			console.log("Error in createNewProjectProjectLists: ", error);
			return Promise.reject(error);
		}
	});

	resolver.define("getProjectDetail", async function (req) {
		try {
			let response = await projectService.getProjectDetail(req.payload.projectId);
			console.log(response);
			return response;
		} catch (error) {
			console.log("Error in getProjectDetail: ", error);
			return Promise.reject(error);
		}
	});


	resolver.define("getJiraProjectsList", async function (req) {
		try {
			return await projectService.getJiraSoftwareProjects({});
		} catch (error) {
			console.log("Error in getProjectsList: ", error);
			return Promise.reject(error);
		}
	});

	resolver.define("estimate", async function (req) {
		try {
			let response = await projectService.estimate(req.payload.projectId);
			console.log(response);
			return response;
		} catch (error) {
			console.log("Error in estimate: ", error);
			return Promise.reject(error);
		}
	});
}

export default projectResolver;
