import { storage } from "@forge/api";
import { CONTEXT, TOKEN } from "../common/constants";
import { createWebTriggerResponse } from "../common/utils";
import { HttpStatus } from "../common/httpStatus";

/**
 * Callback from .net server after OAuth return code, to make a contract with Forge app
 * -> Atlassian -> (code) -> .Net -> Trigger (get context data: appId, cloudId, userId) -> .Net
 * @param {{ body: string; }} request
 */
async function authenBECallbackTrigger(request) {
  try {
    // do the things
    console.log("Triggered by web trigger: ");
    let body = JSON.parse(request.body);
    console.log(body.token);
    await storage.setSecret(TOKEN, body.token);
    let response = createWebTriggerResponse({}, HttpStatus.OK);
    await storage.set("isAuthenticated", true);
    return response;
  } catch (err) {
    console.log("Error in webtrigger: ", err);
    let response = createWebTriggerResponse(
      {},
      HttpStatus.INTERNAL_SERVER_ERROR
    );
    return response;
  }
}

export { authenBECallbackTrigger };
