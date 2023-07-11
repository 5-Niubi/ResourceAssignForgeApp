import API, { route } from "@forge/api";
import APIServices from "./common/APIServices";
import APIJiraServices from "./common/APIJiraServices";

async function getProjects(page) {
	try {
		let response = await APIServices.get(`/api/Projects/GetAllProjects`, null);
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

async function createProject(projectRequest) {
	try {
		let response = await APIServices.post(
			`/api/Projects/CreateProject`,
			null,
			projectRequest
		);
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

async function getProjectDetail(projectId) {
	try {
		let response = await APIServices.get(`/api/Projects/GetProject`, {
			projectId,
		});
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

async function getJiraSoftwareProjects(params) {
	try {
		params.orderBy = "-lastIssueUpdatedTime";
		params.typeKey = "software";
		const result = await APIJiraServices.get(`/rest/api/3/project/search`, params);
		return result;
	} catch (error) {
		return Promise.reject(error);
	}
}

async function estimate(projectId) {
	try {
		let response = await APIServices.get(`/api/Algorithm/GetEstimateWorkforce`, {
			projectId,
		});
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

export {
	getProjects,
	createProject,
	getProjectDetail,
	getJiraSoftwareProjects,
	estimate
};
