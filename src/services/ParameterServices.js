import APIServices from "./common/APIServices";

async function saveParameters(parameter) {
	try {
		let response = await APIServices.post(
			`/api/Parameter/SaveParameter`,
			null,parameter
		);
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

export { saveParameters };
