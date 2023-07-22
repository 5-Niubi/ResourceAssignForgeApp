import Resolver from "@forge/resolver";
import { milestoneService } from "../services";

/**
 * @param {Resolver} resolver
 */
function milestoneResolver(resolver) {
	resolver.define("getAllMilestones", async function (req) {
		try {               
			return await milestoneService.getAllMilestones(req.payload.projectId);
		} catch (error) {
			console.log("Error in getAllMilestones: ", error);
		}
	});

	resolver.define("createMilestone", async function (req) {
		try {
			let response = await milestoneService.createMilestone(req.payload.milestoneObjRequest);
			return response;
		} catch (error) {
			console.log("Error in createMilestone: ", error);
			return Promise.reject(error);
		}
	});
}

export default milestoneResolver;