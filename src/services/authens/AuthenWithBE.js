import { storage, webTrigger } from "@forge/api";
import { CONTEXT, EMPTY_STRING } from "../../common/constants";
import { Base64 } from "../../common/utils";

class AuthenWithBE{
  async generateOAuthURL() {
    let urlTrigger = await webTrigger.getUrl("authen-app-web-trigger-key");
    let context = await storage.getSecret(CONTEXT);
    let stateOAuthURLModel = {
      triggerUrl: urlTrigger,
      accountId: context.accountId,
      cloudId: context.cloudId,
    };
    let stateData = JSON.stringify(stateOAuthURLModel);
    stateData = Base64.encode(stateData);
    const grantAccessUrl =
      `https://auth.atlassian.com/authorize?audience=api.atlassian.com` +
      `&client_id=wDzzxAZSrrM9DtPwZ295BMT3YoFR6KeD` +
      `&scope=manage%3Ajira-project%20write%3Ajira-work%20read%3Ajira-work%20offline_access` +
      `&redirect_uri=http%3A%2F%2Flocalhost%3A14849%2FAuthentication%2FCallback` +
      `&state=${stateData}` +
      `&response_type=code` +
      `&prompt=consent`;
    return grantAccessUrl;
  }
}

export default new AuthenWithBE();
