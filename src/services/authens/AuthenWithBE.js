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
			`&scope=manage%3Ajira-project%20write%3Ajira-work%20read%3Ajira-work%20manage%3Ajira-configuration%20offline_access` +
			`&redirect_uri=http%3A%2F%2Flocalhost%3A5126%2FAuthentication%2FCallback` +
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
		data.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiI2YmZlYjJkMS00NmU5LTQzMWItYTQwYy0zOTFlMmExOWFhNGIiLCJpYXQiOiIwNy8xMC8yMDIzIDE0OjIxOjIwIiwiYWNjb3VudF9pZCI6IjYxZTFiNzJmMDU4NmEyMDA2OWRlMjhmZSIsImNsb3VkX2lkIjoiZWE0OGRkYzctZWQ1Ni00ZDYwLTliNTUtMDI2Njc3MjQ4NDlkIiwiZXhwIjoxNzIwNjIxMjgwLCJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6IkppcmFDbG91ZCJ9.pU2H7ySjUxKopiBVqpJxqALU9ADNojxPb-u-G6PfKBU";
		await storage.setSecret(STORAGE.TOKEN, data.token);
		await storage.set(STORAGE.IS_AUTHENTICATED, true);
	}
}

export default new AuthenWithBE();
