import { storage } from "@forge/api";
import { generateOAuthURL } from "../authens/authenWithBE";
import { WebTriggerResponseModel } from "../models/WebTriggerModel";
import { CONTEXT } from "../common/constants";
import { FullContext } from "@forge/bridge/out/types";

/**
 * Callback from .net server after OAuth return code, to make a contract with Forge app
 * -> Atlassian -> (code) -> .Net -> Trigger (get context data: appId, cloudId, userId) -> .Net
 * @param request
 */
async function authenBECallbackTrigger(request: WebTriggerResponseModel) {
  console.log("Triggered by web trigger: ");
  let context: FullContext = await storage.get(CONTEXT);
  console.log(context);
}

export { authenBECallbackTrigger };
