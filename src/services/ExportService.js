import API, { route } from "@forge/api";
import APIJiraServices from "./common/APIJiraServices";
import APIServices from "./common/APIServices";

async function exportToJira(scheduleId) {
	try {
		const result = await APIServices.get(`/api/Export/ExportToJira`, {
			scheduleId,
		});
		return result;
	} catch (error) {
		return Promise.reject(error);
	}
}

export { exportToJira };
