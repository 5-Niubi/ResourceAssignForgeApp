import { storage } from "@forge/api";
import Resolver from "@forge/resolver";
import { CONTEXT } from "../common/constants";
import { generateOAuthURL } from "../authens/authenWithBE";
import { router } from "@forge/bridge";

function commonResolver(resolver: Resolver) {
  resolver.define("setContextToGlobal", async (req) => {
    await storage.set(CONTEXT, req.context);
    return req.context;
  });

  resolver.define("getAuthenUrl", async function (req) {
    let authenUrl = await generateOAuthURL();
    return authenUrl;
  });
}

export { commonResolver };
