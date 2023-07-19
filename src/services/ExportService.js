import API, { route } from "@forge/api";
import APIJiraServices from "./common/APIJiraServices";
import APIServices from "./common/APIServices";
import { BACKEND_dNET_DOMAIN } from "../common/constants";

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

async function getUrlexportToMSXml(scheduleId) {
	try {
		// Get Token
		const result = await APIServices.get(`/Authentication/GetTokenForDownload`, null);
		let token = result.token;

		let apiDownload = "/api/Export/ExportToMicrosoftProject";
		let url = new URL(`${BACKEND_dNET_DOMAIN}${apiDownload}`);
		url.searchParams.append("scheduleId", scheduleId);
		url.searchParams.append("token", token);
		return url.toString();
	} catch (error) {
		return Promise.reject(error);
	}
}

export { exportToJira, getUrlexportToMSXml };
