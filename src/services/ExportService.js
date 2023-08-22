import { BACKEND_SERVER_DOMAIN } from "../common/environment";
import APIServices from "./common/APIServices";

async function exportToJira(context, scheduleId, projectCreate) {
	try {
		const result = await APIServices.get(`/api/Export/ExportToJira`, {
			scheduleId,
			projectKey: projectCreate.projectKey,
			projectName: projectCreate.projectName,
		});
		return result;
	} catch (error) {
		return Promise.reject(error);
	}
}

async function getUrlexportToMSXml(scheduleId) {
	try {
		// Get Token
		const result = await APIServices.get(
			`/Authentication/GetTokenForDownload`,
			null
		);
		let token = result.token;

		let apiDownload = "/api/Export/ExportToMicrosoftProject";
		let url = new URL(`${BACKEND_SERVER_DOMAIN}${apiDownload}`);
		url.searchParams.append("scheduleId", scheduleId);
		url.searchParams.append("token", token);
		return url.toString();
	} catch (error) {
		return Promise.reject(error);
	}
}

async function checkPrivileges(context) {
	// try {
	// 	console.log(context);
	// 	const result = await APIJiraServices.get(
	// 		`/rest/api/3/user/permission/search`,
	// 		{}
	// 	);
	// 	console.log(return)
	// 	return ;
	// } catch (error) {
	// 	return Promise.reject(error);
	// }
}

export { checkPrivileges, exportToJira, getUrlexportToMSXml };
