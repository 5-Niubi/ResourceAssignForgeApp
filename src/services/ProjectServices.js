import APIServices from "./APIServices";

async function getProjectJiraThrowdNetServer() {
	try {
		let response = await APIServices.get("/JiraProject/GetAllProject");
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

async function createProjectJiraThrowdNetServer() {
	try {
		let response = await APIServices.post("/JiraProject/CreateProject", {
			id: 1,
			name: "Project đó",
		});
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

async function getProjects(page) {
	try {
		let response = await APIServices.get(`/Projects/Index`, { page });
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

export {
	getProjectJiraThrowdNetServer,
	createProjectJiraThrowdNetServer,
	getProjects,
};
