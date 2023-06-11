import API, { storage } from "@forge/api";
import { TOKEN } from "../common/constants";
import APIServices from "./APIServices";

class ProjectServices {
  async getProjectJiraThrowdNetServer() {
    try {
      let response = await APIServices.get("/JiraProject/GetAllProject");
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new ProjectServices();
