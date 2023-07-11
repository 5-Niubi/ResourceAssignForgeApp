import APIServices from "./common/APIServices";

async function exportToJira(projectJiraId, scheduleId) {
	try {
		const result = await APIServices.get(`/api/Export/ExportToJira`, {projectJiraId, scheduleId});
		return result;
	} catch (error) {
		return Promise.reject(error);
	}
}

export { exportToJira };
