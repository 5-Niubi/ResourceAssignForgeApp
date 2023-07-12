import Resolver from "@forge/resolver";
import { parameterService } from "../services";

/**
 * @param {Resolver} resolver
 */
function parameterResolver(resolver) {

	resolver.define("saveParameters", async function (req) {
		try {
			let response = await parameterService.saveParameters(req.payload.parameter);
			console.log("Save Parameters: ", response);
			return response;
		} catch (error) {
			console.log("Error in save parameters: ", error);
			return Promise.reject(error);
		}
	});
}

export default parameterResolver;
