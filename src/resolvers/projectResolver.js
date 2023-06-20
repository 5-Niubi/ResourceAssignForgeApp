import Resolver from "@forge/resolver";
import { projectService } from "../services";

/**
 * @param {Resolver} resolver
 */
function projectResolver(resolver) {
	resolver.define("getProjectFromNet", async function (req) {
		try {
			return await projectService.getProjectJiraThrowdNetServer();
		} catch (error) {
			console.log("Error in getProjectFromNet: ", error);
		}
	});

	resolver.define("createProject", async function () {
		try {
			return await projectService.createProjectJiraThrowdNetServer();
		} catch (error) {
			console.log("Error in createProject: ", error);
		}
	});

	resolver.define("getProjectsList", async function (req) {
		try {
			return await projectService.getProjects(req.payload.page);
		} catch (error) {
			console.log("Error in getProjectsList: ", error);
		}
	});
}

export default projectResolver;
