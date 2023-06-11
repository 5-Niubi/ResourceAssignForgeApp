import { storage } from "@forge/api";
import Resolver from "@forge/resolver";
import { CONTEXT } from "../common/constants";
import { router } from "@forge/bridge";
import AuthenWithBE from "../services/authens/AuthenWithBE";

/**
 * @param {{ define: (arg0: string, arg1: { (req: any): Promise<any>; (req: any): Promise<any>; }) => void; }} resolver
 */
function commonResolver(resolver) {
  resolver.define(
    "setContextToGlobal",
    async (/** @type {{ context: any; }} */ req) => {
      await storage.set(CONTEXT, req.context);
      return req.context;
    }
  );

  resolver.define("getAuthenUrl", async function (/** @type {any} */ req) {
    let authenUrl = await AuthenWithBE.generateOAuthURL();
    let isAuthenticated = await storage.get("isAuthenticated");
    console.log(isAuthenticated);
    return Promise.resolve({
      isAuthenticated,
      authenUrl,
    });
  });
}

export default commonResolver;
