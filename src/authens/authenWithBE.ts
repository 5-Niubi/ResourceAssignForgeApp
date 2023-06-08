import { webTrigger } from "@forge/api";
import { EMPTY_STRING } from "../common/constants";

async function generateOAuthURL() {
  let stateData = EMPTY_STRING;

  let urlTrigger = await webTrigger.getUrl("authen-app-web-trigger-key");

  stateData = urlTrigger;

  const grantAccessUrl = `
    https://auth.atlassian.com/authorize?audience=api.atlassian.com
    &client_id=wDzzxAZSrrM9DtPwZ295BMT3YoFR6KeD
    &scope=manage%3Ajira-project%20write%3Ajira-work%20read%3Ajira-work%20offline_access
    &redirect_uri=http%3A%2F%2Flocalhost%3A14849%2FAuthentication%2FCallback
    &state=${stateData}
    &response_type=code
    &prompt=consent`;
  console.log(grantAccessUrl);
  return grantAccessUrl;
}

export { generateOAuthURL };
