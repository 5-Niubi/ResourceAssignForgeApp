import APIServices from "./common/APIServices";


async function getProjects(page) {
	try {
		let response = await APIServices.get(`/api/Projects/GetAllProjects`, { page });
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

export {
	getProjects,
};
