import Resolver from "@forge/resolver";
import ProjectServices from "../services/projectServices";

/**
 * @param {Resolver} resolver
 */
function projectResolver(resolver){
    resolver.define("getProjectFromNet", async function(req){
        try{
        return await ProjectServices.getProjectJiraThrowdNetServer();
        }catch(error){
            console.log("Error in project Resolver: ", error);
        }
    });
}

export default projectResolver;