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
}

export default skillResolver;