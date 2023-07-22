
import APIJiraServices from "./common/APIJiraServices";
import APIServices from "./common/APIServices";

async function getAllWorkforces(workforceId) {
	try {
		let response = await APIServices.get(`/api/Workforces/GetAllWorkforces`, null);
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

async function getAllUsersJira(params) {
	try {
        let response = await APIJiraServices.getAsUser(`/rest/api/3/users/search`, params);
			console.log("getallusersjira resolver ", response);
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

export {getAllWorkforces, getAllUsersJira};