import APIServices from "./common/APIServices";


async function getProjects(page) {
	try {
		let response = await APIServices.get(`/api/Projects/GetAllProjects`, { page });
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

async function createProject(projectRequest) {
	try {
		let response = await APIServices.post(`/api/Projects/CreateProject`, null, projectRequest);
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

async function getProjectDetail(projectId){
	try {
		let response = await APIServices.get(`/api/Projects/GetProject`, {projectId});
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

export {
	getProjects,
	createProject,
	getProjectDetail
};
