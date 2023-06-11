import API, { storage } from "@forge/api";
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

  async createProjectJiraThrowdNetServer() {
    try {
      let response = await APIServices.post("/JiraProject/CreateProject", {id: 1, name: "Project đó"});
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new ProjectServices();
