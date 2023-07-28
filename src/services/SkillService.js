import APIServices from "./common/APIServices";

async function getAllSkill() {
	try {
		let response = await APIServices.get("/api/Skills/GetSkills", null);
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

async function createSkill(skillReq) {
	try {
		let response = await APIServices.post("/api/Skills/CreateSkill", null, skillReq);
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

export { getAllSkill, createSkill };
