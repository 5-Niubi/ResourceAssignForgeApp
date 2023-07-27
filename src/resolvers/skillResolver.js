import Resolver from "@forge/resolver";
import { skillService } from "../services";

/**
 * @param {Resolver} resolver
 */
function skillResolver(resolver) {
	resolver.define("getAllSkills", async function (req) {
		try {               
			return await skillService.getAllSkill();
		} catch (error) {
			console.log("Error in getAllSkills: ", error);
		}
	});

	resolver.define("createSkill", async function (req) {
		try {               
			return await skillService.createSkill(req.payload.skillReq);
		} catch (error) {
			console.log("Error in createSkill: ", error);
		}
	});
}

export default skillResolver;