import APIServices from "./common/APIServices";

async function getAllSkill() {
	try {
		let response = await APIServices.get("/api/Skills");
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

export { getAllSkill };
