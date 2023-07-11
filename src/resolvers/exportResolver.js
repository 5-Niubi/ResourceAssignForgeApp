import Resolver from "@forge/resolver";
import { exportService } from "../services";

/**
 * @param {Resolver} resolver
 */
function exportResolver(resolver){
    resolver.define("exportToJira", async function (request){
        try {
            return await exportService.exportToJira(request.payload.projectJiraId, request.payload.scheduleId);
        } catch (error){
            console.log("exportToJira Error: ", error);
            return Promise.reject(error);
        }
    });
}

export default exportResolver;