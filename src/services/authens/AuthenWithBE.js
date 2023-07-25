import { storage, webTrigger } from "@forge/api";
import { STORAGE } from "../../common/constants";
import { Base64 } from "../../common/utils";

class AuthenWithBE {
	clientId = "wDzzxAZSrrM9DtPwZ295BMT3YoFR6KeD";

	async generateOAuthURL(context) {
		let urlTrigger = await webTrigger.getUrl("authen-app-web-trigger-key");
		let stateOAuthURLModel = {
			triggerUrl: urlTrigger,
			accountId: context.accountId,
			cloudId: context.cloudId,
		};
		let stateData = JSON.stringify(stateOAuthURLModel);
		stateData = Base64.encode(stateData);
		const grantAccessUrl =
			`https://auth.atlassian.com/authorize?audience=api.atlassian.com` +
			`&client_id=${this.clientId}` +
			`&scope=manage%3Ajira-project%20write%3Ajira-work%20read%3Ajira-work%20manage%3Ajira-configuration%20read%3Ajira-user%20offline_access` +
			`&redirect_uri=http://localhost:5126/Authentication/Callback` +
			`&state=${stateData}` +
			`&response_type=code` +
			`&prompt=consent`;
		return grantAccessUrl;
	}

	async handleUnauthorizedStatus() {
		storage.delete(STORAGE.IS_AUTHENTICATED);
		storage.deleteSecret(STORAGE.TOKEN);
	}

	/**
	 * @param {Object} data
	 */
	async handleAuthenCallbackFromNET(data) {
		// Fixed accessToken BE
		data.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiIwNGQzYTkzMC1iNTliLTQ5ZWMtODk5Zi04NGIwNzVjOTQyOGQiLCJpYXQiOiI2LzI1LzIwMjMgMDg6MTI6NDQiLCJhY2NvdW50X2lkIjoiNjFlMWI3MmYwNTg2YTIwMDY5ZGUyOGZlIiwiY2xvdWRfaWQiOiJlYTQ4ZGRjNy1lZDU2LTRkNjAtOWI1NS0wMjY2NzcyNDg0OWQiLCJleHAiOjE3MTkzMDMxNjQsImlzcyI6IkpXVEF1dGhlbnRpY2F0aW9uU2VydmVyIiwiYXVkIjoiSmlyYUNsb3VkIn0.j7VXUPxU3OK7sfIfHsFtr3op4lfzTNAlXtJyJlpPnqY";
		await storage.setSecret(STORAGE.TOKEN, data.token);
		await storage.set(STORAGE.IS_AUTHENTICATED, true);
	}
}

export default new AuthenWithBE();
