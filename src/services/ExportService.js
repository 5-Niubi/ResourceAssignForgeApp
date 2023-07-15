import API, { route } from "@forge/api";
import APIJiraServices from "./common/APIJiraServices";
import APIServices from "./common/APIServices";

async function exportToJira(projectJiraId, scheduleId) {
	try {
		// const result = await APIServices.get(`/api/Export/ExportToJira`, {projectJiraId, scheduleId});
		var data = JSON.parse(`{
			"contexts": [
			  {
				"issueTypeId": "10023",
				"projectId": "10006",
				"viewType": "GIC"
			  }
			],
			"data": "{field: 'duedate', config: {hidden: false}}",
			"description": "Reveals Story Points field when any Sprint is selected.",
			"name": "Due Date"
		  }`);
		const result = await APIJiraServices.post("/rest/api/3/uiModifications",null, data);
		return result;

	} catch (error) {
		return Promise.reject(error);
	}
}

export { exportToJira };
