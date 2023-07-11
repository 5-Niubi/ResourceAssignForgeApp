
import APIServices from "./common/APIServices";

async function getAllWorkforces(workforceId) {
	try {
		let response = await APIServices.get(`/api/Workforces/GetAllWorkforces`, null);
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

export {getAllWorkforces};