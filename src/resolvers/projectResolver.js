import Resolver from "@forge/resolver";
import ProjectServices from "../services/projectServices";

/**
 * @param {Resolver} resolver
 */
function projectResolver(resolver) {
  resolver.define("getProjectFromNet", async function (req) {
    try {
      return await ProjectServices.getProjectJiraThrowdNetServer();
    } catch (error) {
      console.log("Error in getProjectFromNet: ", error);
    }
  });

  resolver.define("createProject", async function () {
    try {
        return await ProjectServices.createProjectJiraThrowdNetServer();
      } catch (error) {
        console.log("Error in createProject: ", error);
      }
  });
}

export default projectResolver;
