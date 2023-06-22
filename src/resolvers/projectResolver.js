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
		}
	});
}

export default projectResolver;
