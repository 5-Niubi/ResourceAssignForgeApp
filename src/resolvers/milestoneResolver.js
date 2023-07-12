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
}

export default milestoneResolver;