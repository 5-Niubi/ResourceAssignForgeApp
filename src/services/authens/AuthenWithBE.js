import { storage, webTrigger } from "@forge/api";
import { STORAGE } from "../../common/constants";
import { Base64 } from "../../common/utils";
import { APP_CLIENT_ID } from "../../common/environment";

class AuthenWithBE {
	clientId = APP_CLIENT_ID;

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
			`&redirect_uri=https%3A%2F%2Fbe.ai4cert.com%2FAuthentication%2FCallback` +
			`&state=${stateData}` +
			`&response_type=code` +
			`&prompt=consent`;
		return grantAccessUrl;
	}

	async handleUnauthorizedStatus() {
		// storage.delete(STORAGE.IS_AUTHENTICATED);
		storage.deleteSecret(STORAGE.TOKEN);
	}
 
	/**
	 * @param {Object} data
	 */
	async handleAuthenCallbackFromNET(data) {
		// Fixed accessToken BE
		// data.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiJjOWZiMzMwOS1iNTk0LTRmNTAtODVkNy02ZDlkNzE0MGQyYzciLCJpYXQiOiIwOC8xMC8yMDIzIDE3OjA3OjM3IiwiYWNjb3VudF9pZCI6IjYxZTFiNzJmMDU4NmEyMDA2OWRlMjhmZSIsImNsb3VkX2lkIjoiMzFhOGE5MzMtYWFmZC00YzY3LWFmMmEtOTg3MmM0YzAwMGEwIiwiZXhwIjoxNzIzMzA5NjU3LCJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6IkppcmFDbG91ZCJ9.KLhYQTKQAasCCHwHuJcisgv64tgJiA04uq75wfI2aXU";
		await storage.setSecret(STORAGE.TOKEN, data.token);
		// await storage.set(STORAGE.IS_AUTHENTICATED, true);
	}
}

export default new AuthenWithBE();
