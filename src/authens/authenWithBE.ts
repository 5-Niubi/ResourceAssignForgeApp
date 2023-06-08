import { storage, webTrigger } from "@forge/api";
import { CONTEXT, EMPTY_STRING } from "../common/constants";
import { FullContext } from "@forge/bridge/out/types";
import { StateOAuthURLModel } from "../models/StateOAuthURLModel";
import { Base64 } from "../common/utils";

async function generateOAuthURL() {
  let urlTrigger = await webTrigger.getUrl("authen-app-web-trigger-key");
  let context: FullContext = await storage.getSecret(CONTEXT);
  let stateOAuthURLModel: StateOAuthURLModel = {
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
  console.log(grantAccessUrl);
  return grantAccessUrl;
}

export { generateOAuthURL };
