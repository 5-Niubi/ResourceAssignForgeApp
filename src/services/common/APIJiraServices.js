import API, { route, storage } from "@forge/api";
import { STORAGE } from "../../common/constants";
import { HttpStatus } from "../../common/httpStatus";
import AuthenWithBE from "../authens/AuthenWithBE";

class APIJiraService {
	async get(url, params) {
		try {
			const queryParams = new URLSearchParams();
			if (params) {
				Object.keys(params).forEach((key) =>
					queryParams.append(key, params[key])
				);
			}
			let response = await API.asApp().requestJira(route`${url}?${queryParams}`, {
				method: "GET"
			});

			switch (response.status) {
				case HttpStatus.OK.code:
					return await response.json();
				case HttpStatus.UNAUTHORIZED.code:
					AuthenWithBE.handleUnauthorizedStatus();
					break;
				case HttpStatus.BAD_REQUEST.code:
					return Promise.reject(await response.json());
			}
			return Promise.reject(response);
		} catch (err) {
			return Promise.reject(err);
		}
	}

	/**
	 * @param {string} url
	 * @param {Object} data
	 */
	async post(url, params, data) {
		try {
			const queryParams = new URLSearchParams();
			if (params) {
				Object.keys(params).forEach((key) =>
					queryParams.append(key, params[key])
				);
			}
			let response = await API.asApp().requestJira(route`${url}?${queryParams}`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${await storage.getSecret(STORAGE.TOKEN)}`,
				},
				body: JSON.stringify(data),
			});
			switch (response.status) {
				case HttpStatus.OK.code:
					return await response.json();
				case HttpStatus.UNAUTHORIZED.code:
					AuthenWithBE.handleUnauthorizedStatus();
					break;
				case HttpStatus.BAD_REQUEST.code:
					return Promise.reject(await response.json());
			}
			return Promise.reject(response);
		} catch (err) {
			return Promise.reject(err);
		}
	}
}

export default new APIJiraService();
