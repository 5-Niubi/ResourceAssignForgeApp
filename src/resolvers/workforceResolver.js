import Resolver from "@forge/resolver";
import { workforceService } from "../services";

/**
 * @param {Resolver} resolver
 */
function workforceResolver(resolver){
    resolver.define("getAllWorkforces", async function (request){
        try {
            return await workforceService.getAllWorkforces(request.payload.page);
        } catch (error){
            console.log("Workforce Error: ", error);
            return Promise.reject(error);
        }
    });
}

export default workforceResolver;